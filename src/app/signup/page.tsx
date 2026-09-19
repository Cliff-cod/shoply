"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notice, setNotice] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setNotice("");

    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      setNotice("Add your Supabase URL and anon key to .env.local before creating an account.");
      setLoading(false);
      return;
    }

    const { error } = await createSupabaseBrowserClient().auth.signUp({
      email,
      password,
      options: { data: { name }, emailRedirectTo: `${window.location.origin}/login` },
    });

    if (error) {
      setNotice(error.message);
      setLoading(false);
      return;
    }

    setNotice("Account created. Check your email to confirm it, then continue to set up your store.");
    setLoading(false);
  }

  return <main className="auth-page"><Link className="flow-brand" href="/">CEDAR<span>&</span>CLAY</Link><div className="auth-card"><p className="eyebrow">Start something of your own</p><h1>Make room for<br /><em>your ideas.</em></h1><p className="auth-intro">Create one account to shop independent stores or launch your own corner of the internet.</p><form className="checkout-form" onSubmit={submit}><label>Your name<input required value={name} onChange={(event) => setName(event.target.value)} placeholder="Your name" /></label><label>Email address<input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" /></label><label>Password<input required type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="At least 8 characters" minLength={8} /></label><button className="checkout-button" type="submit" disabled={loading}>{loading ? "Creating account..." : "Create account"} <span>↗</span></button></form>{notice && <p className="form-notice">{notice} <Link href="/create-store">Set up your store →</Link></p>}<p className="switch-auth">Already have an account? <Link href="/login">Sign in</Link></p></div></main>;
}
