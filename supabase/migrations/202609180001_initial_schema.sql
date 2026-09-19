create extension if not exists "pgcrypto";

create type public.user_role as enum ('buyer', 'seller', 'platform_admin');
create type public.store_status as enum ('draft', 'active', 'suspended');
create type public.product_status as enum ('draft', 'live');
create type public.order_status as enum ('pending', 'paid', 'shipped', 'delivered', 'cancelled');

create table public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  name text,
  email text not null,
  role public.user_role not null default 'buyer',
  created_at timestamptz not null default now()
);

create table public.stores (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.users(id) on delete cascade,
  name text not null,
  subdomain text not null unique check (subdomain ~ '^[a-z0-9]+$'),
  custom_domain text unique,
  template_id text not null default 'editorial',
  status public.store_status not null default 'draft',
  created_at timestamptz not null default now()
);

create table public.store_config (
  store_id uuid primary key references public.stores(id) on delete cascade,
  logo_url text,
  primary_color text not null default '#B54D32',
  banner_url text,
  sections jsonb not null default '{}'::jsonb
);

create table public.products (
  id uuid primary key default gen_random_uuid(),
  store_id uuid not null references public.stores(id) on delete cascade,
  title text not null,
  description text,
  price numeric(12, 2) not null check (price >= 0),
  stock integer not null default 0 check (stock >= 0),
  image_url text,
  category text,
  status public.product_status not null default 'draft',
  created_at timestamptz not null default now()
);

create table public.orders (
  id uuid primary key default gen_random_uuid(),
  store_id uuid not null references public.stores(id) on delete restrict,
  buyer_id uuid references public.users(id) on delete set null,
  status public.order_status not null default 'pending',
  total numeric(12, 2) not null check (total >= 0),
  payment_reference text unique,
  created_at timestamptz not null default now()
);

create table public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid not null references public.products(id) on delete restrict,
  quantity integer not null check (quantity > 0),
  unit_price numeric(12, 2) not null check (unit_price >= 0)
);

create index products_store_id_idx on public.products(store_id);
create index orders_store_id_idx on public.orders(store_id);
create index orders_buyer_id_idx on public.orders(buyer_id);

create or replace function public.is_store_owner(target_store_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.stores
    where id = target_store_id and owner_id = auth.uid()
  );
$$;

alter table public.users enable row level security;
alter table public.stores enable row level security;
alter table public.store_config enable row level security;
alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;

create policy "Users can view their profile" on public.users
  for select using (id = auth.uid());

create policy "Users can update their profile" on public.users
  for update using (id = auth.uid()) with check (id = auth.uid());

create policy "Anyone can view active stores" on public.stores
  for select using (status = 'active' or owner_id = auth.uid());

create policy "Users can create their own store" on public.stores
  for insert with check (owner_id = auth.uid());

create policy "Owners can update their store" on public.stores
  for update using (owner_id = auth.uid()) with check (owner_id = auth.uid());

create policy "Public can view active store config" on public.store_config
  for select using (exists (select 1 from public.stores where id = store_id and status = 'active') or public.is_store_owner(store_id));

create policy "Owners can manage store config" on public.store_config
  for all using (public.is_store_owner(store_id)) with check (public.is_store_owner(store_id));

create policy "Public can view live products" on public.products
  for select using (status = 'live' and exists (select 1 from public.stores where id = store_id and status = 'active') or public.is_store_owner(store_id));

create policy "Owners can create products" on public.products
  for insert with check (public.is_store_owner(store_id));

create policy "Owners can update products" on public.products
  for update using (public.is_store_owner(store_id)) with check (public.is_store_owner(store_id));

create policy "Owners can delete products" on public.products
  for delete using (public.is_store_owner(store_id));

create policy "Buyers can view their orders" on public.orders
  for select using (buyer_id = auth.uid() or public.is_store_owner(store_id));

create policy "Buyers can create orders" on public.orders
  for insert with check (buyer_id = auth.uid() or buyer_id is null);

create policy "Owners can update order status" on public.orders
  for update using (public.is_store_owner(store_id)) with check (public.is_store_owner(store_id));

create policy "Order participants can view items" on public.order_items
  for select using (exists (select 1 from public.orders where id = order_id and (buyer_id = auth.uid() or public.is_store_owner(store_id))));

create policy "Buyers can create order items" on public.order_items
  for insert with check (exists (select 1 from public.orders where id = order_id and (buyer_id = auth.uid() or buyer_id is null)));

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.users (id, name, email)
  values (new.id, new.raw_user_meta_data ->> 'name', new.email);
  return new;
end;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();
