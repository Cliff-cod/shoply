"use client";

import { FormEvent, useState } from "react";

export default function CheckoutPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <main className="flow-page confirmation-page">
        <a className="flow-brand" href="/">CEDAR<span>&</span>CLAY</a>
        <div className="confirmation-card">
          <p className="eyebrow">Order received</p>
          <h1>Thank you for<br /><em>choosing slowly.</em></h1>
          <p>Your order <strong>#CC-1048</strong> is confirmed. We&apos;ll send updates to your email as it moves from our studio to your door.</p>
          <a className="primary-button" href="/">Continue shopping <span>↗</span></a>
        </div>
      </main>
    );
  }

  return (
    <main className="flow-page">
      <header className="flow-header"><a className="flow-brand" href="/">CEDAR<span>&</span>CLAY</a><a className="back-link" href="/">← Back to store</a></header>
      <div className="checkout-layout">
        <section className="checkout-form-wrap"><p className="eyebrow">Almost yours</p><h1>Complete your<br /><em>order.</em></h1><form className="checkout-form" onSubmit={handleSubmit}><label>Full name<input required placeholder="Your name" /></label><label>Email address<input required type="email" placeholder="you@example.com" /></label><label>Delivery address<input required placeholder="Street address" /></label><div className="split-fields"><label>City<input required placeholder="Accra" /></label><label>Phone<input required placeholder="+233" /></label></div><div className="payment-note"><span>Secure payment</span><strong>Paystack</strong><p>Payment integration is ready for test mode. Your card details are never stored by Cedar & Clay.</p></div><button className="checkout-button" type="submit">Place order <span>↗</span></button></form></section>
        <aside className="order-summary"><p className="eyebrow">Your order</p><div className="summary-item"><div className="summary-thumb" /><div><h2>Ripple tea set</h2><p>1 × $68</p></div><strong>$68</strong></div><div className="summary-lines"><span>Subtotal <b>$68</b></span><span>Delivery <b>$0</b></span><span className="summary-total">Total <b>$68</b></span></div></aside>
      </div>
    </main>
  );
}
