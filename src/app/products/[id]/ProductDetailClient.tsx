"use client";

import Link from "next/link";
import { useState } from "react";
import { type Product, money } from "@/lib/catalog";

export default function ProductDetailClient({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  return <main className="product-detail-page"><header className="site-header"><Link className="wordmark" href="/">CEDAR<span>&</span>CLAY</Link><Link className="back-link" href="/">← Back to collection</Link><Link className="cart-button" href="/cart">Bag <span>01</span></Link></header><div className="detail-layout"><div className="detail-image" style={{ backgroundImage: `url(${product.image})` }} /><section className="detail-copy"><p className="eyebrow">{product.category} / Cedar & Clay</p><h1>{product.name}</h1><strong className="detail-price">{money.format(product.price)}</strong><p className="detail-description">{product.description}</p><div className="detail-actions"><div className="quantity-control"><button onClick={() => setQuantity(Math.max(1, quantity - 1))} aria-label="Decrease quantity">−</button><span>{quantity}</span><button onClick={() => setQuantity(quantity + 1)} aria-label="Increase quantity">+</button></div><button className="checkout-button" onClick={() => setAdded(true)}>{added ? "Added to bag" : "Add to bag"} <span>{added ? "✓" : "↗"}</span></button></div><div className="detail-notes"><div><span>Material</span><strong>Hand-finished stoneware</strong></div><div><span>Delivery</span><strong>Free over $80 · 3-5 days</strong></div><div><span>Care</span><strong>Dishwasher safe</strong></div></div></section></div></main>;
}
