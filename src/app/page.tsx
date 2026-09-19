"use client";

import { useMemo, useState } from "react";
import { categories, money, products } from "@/lib/catalog";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("All pieces");
  const [search, setSearch] = useState("");
  const [cart] = useState<number[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  const visibleProducts = useMemo(() => {
    const normalizedSearch = search.toLowerCase().trim();
    return products.filter((product) => {
      const matchesCategory =
        activeCategory === "All pieces" || product.category === activeCategory;
      const matchesSearch =
        !normalizedSearch || product.name.toLowerCase().includes(normalizedSearch);
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, search]);

  const cartProducts = cart.map((id) => products.find((product) => product.id === id)!);
  const cartTotal = cartProducts.reduce((total, product) => total + product.price, 0);

  return (
    <div className="site-shell">
      <div className="announcement">Free delivery on orders over $80 <span>·</span> Ships from Accra</div>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Cedar and Clay home">CEDAR<span>&</span>CLAY</a>
        <nav className="desktop-nav" aria-label="Main navigation">
          <a href="#shop">Shop</a>
          <a href="#story">Our story</a>
          <a href="#journal">Journal</a>
          <a href="/dashboard">Sell with us</a>
        </nav>
        <div className="header-actions">
          <label className="search-field">
            <span aria-hidden="true">⌕</span>
            <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search objects" aria-label="Search objects" />
          </label>
          <button className="cart-button" onClick={() => setCartOpen(true)} aria-label={`Open cart with ${cart.length} items`}>
            Bag <span>{cart.length.toString().padStart(2, "0")}</span>
          </button>
        </div>
      </header>

      <main id="top">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow">A considered home, made slowly</p>
            <h1 id="hero-title">Objects with<br /><em>a point of view.</em></h1>
            <p className="hero-text">Thoughtful pieces for everyday rituals. Made by independent hands, chosen for the way they make a room feel.</p>
            <a className="primary-button" href="#shop">Explore the collection <span>↘</span></a>
          </div>
          <div className="hero-image" role="img" aria-label="Handmade ceramic vases on a warm shelf" />
          <div className="hero-note"><span>01 / 03</span><span>New season, grounded</span></div>
        </section>

        <section className="collection" id="shop" aria-labelledby="collection-title">
          <div className="section-heading">
            <div><p className="eyebrow">The edit</p><h2 id="collection-title">Small things,<br /><em>well chosen.</em></h2></div>
            <p>Our latest collection brings together useful, tactile objects that earn their place in your everyday.</p>
          </div>
          <div className="category-row" aria-label="Filter products by category">
            {categories.map((category) => <button key={category} className={activeCategory === category ? "category active" : "category"} onClick={() => setActiveCategory(category)}>{category}</button>)}
          </div>
          <div className="product-grid">
            {visibleProducts.map((product) => (
              <article className="product-card" key={product.id}>
                <a className="product-image" href={`/products/${product.id}`} aria-label={`View ${product.name}`} style={{ backgroundImage: `url(${product.image})` }}>
                  {product.badge && <span className="product-badge">{product.badge}</span>}
                  <span className="quick-add">+ Add to bag</span>
                </a>
                <div className="product-meta"><div><h3>{product.name}</h3><p>{product.category}</p></div><strong>{money.format(product.price)}</strong></div>
              </article>
            ))}
          </div>
          {visibleProducts.length === 0 && <p className="empty-results">Nothing found yet. Try another search.</p>}
        </section>

        <section className="story-band" id="story"><div className="story-image" /><div className="story-copy"><p className="eyebrow">Why Cedar & Clay</p><h2>Good objects<br /><em>settle in.</em></h2><p>We look for the marks of the maker, the honest material, the detail that makes you reach for something every day. A little less, but a lot better.</p><a className="text-link" href="#journal">Read our story <span>↗</span></a></div></section>
      </main>

      <footer id="journal"><span>CEDAR<span>&</span>CLAY</span><p>Independent objects for a slower home.</p><span>© 2024</span></footer>

      {cartOpen && <div className="cart-overlay" role="dialog" aria-modal="true" aria-label="Shopping bag"><div className="cart-panel"><div className="cart-header"><div><p className="eyebrow">Your selections</p><h2>Shopping bag <span>{cart.length}</span></h2></div><button className="close-button" onClick={() => setCartOpen(false)} aria-label="Close shopping bag">×</button></div>{cart.length === 0 ? <p className="cart-empty">Your bag is waiting for something lovely.</p> : <><div className="cart-items">{cartProducts.map((product, index) => <div className="cart-item" key={`${product.id}-${index}`}><div className="cart-thumb" style={{ backgroundImage: `url(${product.image})` }} /><div><h3>{product.name}</h3><p>{money.format(product.price)}</p></div></div>)}</div><div className="cart-total"><span>Total</span><strong>{money.format(cartTotal)}</strong></div><a className="checkout-button" href="/checkout">Continue to checkout <span>↗</span></a></>}</div></div>}
    </div>
  );
}
