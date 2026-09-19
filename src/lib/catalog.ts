export type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  badge?: string;
};

export const categories = ["All pieces", "Ceramics", "Textiles", "Desk objects"];

export const products: Product[] = [
  { id: 1, name: "Ripple tea set", category: "Ceramics", price: 68, badge: "New", description: "A softly ridged stoneware set for slow mornings and long conversations.", image: "https://images.unsplash.com/photo-1572119865084-43c285814d63?auto=format&fit=crop&w=900&q=85" },
  { id: 2, name: "Tactile linen throw", category: "Textiles", price: 94, description: "Washed linen with a generous weight and a naturally relaxed edge.", image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=900&q=85" },
  { id: 3, name: "Sundial candle", category: "Ceramics", price: 32, description: "A warm, cedar-scented candle poured into a reusable clay vessel.", image: "https://images.unsplash.com/photo-1602874801006-e26b7d5b9f6f?auto=format&fit=crop&w=900&q=85" },
  { id: 4, name: "Ochre catchall", category: "Desk objects", price: 42, description: "A small hand-finished tray for the objects that follow you home.", image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=900&q=85" },
  { id: 5, name: "Dune water carafe", category: "Ceramics", price: 76, description: "An easy-to-pour carafe shaped to feel good in the hand.", image: "https://images.unsplash.com/photo-1610701596061-2ecf227e85b3?auto=format&fit=crop&w=900&q=85" },
  { id: 6, name: "Handwoven market bag", category: "Textiles", price: 54, description: "A sturdy everyday carry woven from natural fibers by a small studio.", image: "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=900&q=85" },
];

export const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

export function getProduct(id: string | number) {
  return products.find((product) => product.id === Number(id));
}
