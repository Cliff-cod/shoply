"use client";

import { useState } from "react";
import { getProduct, money } from "@/lib/catalog";

const initialItems = [{ id: 1, quantity: 1 }, { id: 3, quantity: 2 }];

export default function CartPage() {
  const [items, setItems] = useState(initialItems);
  const updateQuantity = (id: number, amount: number) => setItems((current) => current.map((item) => item.id === id ? { ...item, quantity: Math.max(0, item.quantity + amount) } : item).filter((item) => item.quantity > 0));
  const total = items.reduce((sum, item) => { const product = getProduct(item.id); return sum + (product?.price ?? 0) * item.quantity; }, 0);

  return <main className="flow-page cart-page"><header className="flow-header"><a className="flow-brand" href="/">CEDAR<span>&</span>CLAY</a><a className="back-link" href="/">← Continue shopping</a></header><div className="cart-page-heading"><p className="eyebrow">Your selections</p><h1>Shopping<br /><em>bag.</em></h1></div><div className="cart-page-layout"><section className="cart-list">{items.length === 0 ? <p className="cart-empty">Your bag is waiting for something lovely.</p> : items.map((item) => { const product = getProduct(item.id); if (!product) return null; return <div className="cart-page-item" key={item.id}><div className="cart-page-thumb" style={{ backgroundImage: `url(${product.image})` }} /><div className="cart-page-item-copy"><h2>{product.name}</h2><p>{product.category}</p><div className="quantity-control"><button onClick={() => updateQuantity(item.id, -1)} aria-label={`Remove one ${product.name}`}>−</button><span>{item.quantity}</span><button onClick={() => updateQuantity(item.id, 1)} aria-label={`Add one ${product.name}`}>+</button></div></div><strong>{money.format(product.price * item.quantity)}</strong></div>; })}</section><aside className="cart-page-summary"><p className="eyebrow">Order summary</p><div><span>Subtotal</span><strong>{money.format(total)}</strong></div><div><span>Delivery</span><strong>{total >= 80 ? "Free" : "$8"}</strong></div><div className="cart-page-total"><span>Total</span><strong>{money.format(total >= 80 ? total : total + 8)}</strong></div><a className="checkout-button" href="/checkout">Proceed to checkout <span>↗</span></a></aside></div></main>;
}
