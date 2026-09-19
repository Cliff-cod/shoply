"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

const dashboardProducts = [{ name: "Ripple tea set", price: "$68", stock: "18 in stock", status: "Live" }, { name: "Sundial candle", price: "$32", stock: "6 in stock", status: "Live" }, { name: "Ochre catchall", price: "$42", stock: "Draft", status: "Draft" }];

export default function DashboardPage() {
  const router = useRouter();
  const [active, setActive] = useState("Overview");
  const hasSupabaseConfig = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  const [authReady, setAuthReady] = useState(!hasSupabaseConfig);

  useEffect(() => {
    if (!hasSupabaseConfig) return;

    createSupabaseBrowserClient().auth.getUser().then(({ data }) => {
      if (!data.user) router.replace("/login");
      else setAuthReady(true);
    });
  }, [hasSupabaseConfig, router]);

  if (!authReady) return <main className="dashboard-page"><div className="dashboard-placeholder"><p className="eyebrow">Checking access</p><h3>Opening your seller dashboard...</h3></div></main>;

  return <main className="dashboard-page"><aside className="dashboard-sidebar"><a className="flow-brand" href="/">CEDAR<span>&</span>CLAY</a><p className="dashboard-label">Your store</p><h1>Cedar & Clay</h1><nav>{["Overview", "Products", "Orders", "Store settings"].map((item) => <button key={item} className={active === item ? "dashboard-nav active" : "dashboard-nav"} onClick={() => setActive(item)}>{item}<span>→</span></button>)}</nav><a className="view-store" href="/">View storefront ↗</a></aside><section className="dashboard-content"><header className="dashboard-top"><div><p className="eyebrow">Seller dashboard</p><h2>{active}</h2></div><a className="dashboard-avatar" href="/login">AM</a></header>{active === "Overview" ? <><div className="stat-grid"><div><span>Today&apos;s sales</span><strong>$420</strong><small>↑ 18% from yesterday</small></div><div><span>Pending orders</span><strong>08</strong><small>3 need your attention</small></div><div><span>Store visits</span><strong>1,284</strong><small>↑ 24% this week</small></div></div><ProductTable /></> : active === "Products" ? <ProductTable /> : <div className="dashboard-placeholder"><p className="eyebrow">Next connection</p><h3>{active} tools are ready for the Supabase data layer.</h3><p>This route is wired into the seller shell so the workflow can grow without changing the navigation.</p></div>}</section></main>;
}

function ProductTable() {
  return <div className="dashboard-section"><div className="dashboard-section-head"><div><p className="eyebrow">Inventory</p><h3>Your products</h3></div><button className="small-button">+ Add product</button></div><div className="product-table">{dashboardProducts.map((product) => <div className="table-row" key={product.name}><div className="table-product"><span className="table-thumb" /><strong>{product.name}</strong></div><span>{product.price}</span><span>{product.stock}</span><span className={product.status === "Live" ? "status live" : "status"}>{product.status}</span><button aria-label={`Edit ${product.name}`}>···</button></div>)}</div></div>;
}
