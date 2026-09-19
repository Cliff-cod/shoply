"use client";

import { FormEvent, useState } from "react";

const steps = ["Name your store", "Choose a category", "Pick a template", "Add your branding"];
const categories = ["Fashion & accessories", "Food & drink", "Home & living", "Gadgets", "Digital products"];

export default function CreateStorePage() {
  const [step, setStep] = useState(0);
  const [storeName, setStoreName] = useState("");
  const [subdomain, setSubdomain] = useState("");
  const [category, setCategory] = useState("");
  const [template, setTemplate] = useState("Editorial");
  const [primaryColor, setPrimaryColor] = useState("#B54D32");
  const [completed, setCompleted] = useState(false);

  function next(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (step < steps.length - 1) setStep(step + 1);
    else setCompleted(true);
  }

  if (completed) {
    return <main className="wizard-page"><a className="flow-brand" href="/">CEDAR<span>&</span>CLAY</a><section className="wizard-complete"><p className="eyebrow">Your store is ready</p><h1>Welcome to<br /><em>{storeName || "your store"}.</em></h1><p>Your storefront will be live at <strong>{subdomain || "yourstore"}.shoply.com</strong>. You can add products and refine the look from your dashboard.</p><a className="checkout-button" href="/dashboard">Go to seller dashboard <span>↗</span></a></section></main>;
  }

  return <main className="wizard-page"><header className="wizard-header"><a className="flow-brand" href="/">CEDAR<span>&</span>CLAY</a><span>Store setup</span><a className="back-link" href="/">Save and exit</a></header><section className="wizard-shell"><div className="wizard-progress"><span>0{step + 1}</span><div><strong>{steps[step]}</strong><small>Step {step + 1} of {steps.length}</small></div><div className="progress-track"><i style={{ width: `${((step + 1) / steps.length) * 100}%` }} /></div></div><form className="wizard-form" onSubmit={next}>{step === 0 && <><p className="eyebrow">A home for your work</p><h1>Let&apos;s name<br /><em>your place.</em></h1><p className="wizard-intro">Choose a name and a simple address customers can remember.</p><label>Store name<input required value={storeName} onChange={(event) => { setStoreName(event.target.value); setSubdomain(event.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "").slice(0, 24)); }} placeholder="e.g. Cedar & Clay" /></label><label>Store address<div className="subdomain-input"><input required pattern="[a-z0-9]+" value={subdomain} onChange={(event) => setSubdomain(event.target.value.toLowerCase().replace(/[^a-z0-9]/g, ""))} placeholder="cedarclay" /><span>.shoply.com</span></div></label><p className="availability">✓ This address is available</p></>}{step === 1 && <><p className="eyebrow">Help shoppers find you</p><h1>What do you<br /><em>make?</em></h1><p className="wizard-intro">This helps us shape discovery later. You can change it anytime.</p><div className="choice-grid">{categories.map((item) => <button type="button" key={item} className={category === item ? "choice active" : "choice"} onClick={() => setCategory(item)}>{item}<span>{category === item ? "✓" : "↗"}</span></button>)}</div><input required tabIndex={-1} className="choice-validation" value={category} onChange={() => undefined} aria-label="Selected category" /></>}{step === 2 && <><p className="eyebrow">Your first impression</p><h1>Pick a starting<br /><em>point.</em></h1><p className="wizard-intro">Your products and content stay the same if you switch templates later.</p><div className="template-grid">{["Editorial", "Gallery"].map((item) => <button type="button" key={item} className={template === item ? "template-choice active" : "template-choice"} onClick={() => setTemplate(item)}><span className={`template-preview ${item.toLowerCase()}`}><i /><b /></span><strong>{item}</strong><small>{item === "Editorial" ? "Warm and considered" : "Image-led and open"}</small></button>)}</div></>}{step === 3 && <><p className="eyebrow">Make it yours</p><h1>Bring your<br /><em>signature.</em></h1><p className="wizard-intro">Start with a color. You can upload a logo and banner from Store settings later.</p><label>Primary color<div className="color-choice"><input type="color" value={primaryColor} onChange={(event) => setPrimaryColor(event.target.value)} /><span>{primaryColor}</span></div></label><div className="logo-placeholder"><span>+</span><div><strong>Add your logo</strong><small>Optional · PNG or JPG</small></div></div></>}<button className="checkout-button wizard-next" type="submit">{step === steps.length - 1 ? "Create my store" : "Continue"}<span>↗</span></button></form></section></main>;
}
