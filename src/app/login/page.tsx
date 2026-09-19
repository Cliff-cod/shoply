"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notice, setNotice] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setNotice("");

    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      setNotice("Add your Supabase URL and anon key to .env.local before signing in.");
      setLoading(false);
      return;
    }

    const { error } = await createSupabaseBrowserClient().auth.signInWithPassword({ email, password });
    if (error) {
      setNotice(error.message);
      setLoading(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return <main className="auth-page"><Link className="flow-brand" href="/">CEDAR<span>&</span>CLAY</Link><div className="auth-card"><p className="eyebrow">Welcome back</p><h1>Good to see<br /><em>you again.</em></h1><p className="auth-intro">Sign in to manage your store, or view your orders across Cedar & Clay.</p><form className="checkout-form" onSubmit={submit}><label>Email address<input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" /></label><label>Password<input required type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="••••••••" /></label><button className="checkout-button" type="submit" disabled={loading}>{loading ? "Signing in..." : "Sign in"} <span>↗</span></button></form>{notice && <p className="form-notice">{notice}</p>}<p className="switch-auth">New here? <Link href="/signup">Create an account</Link></p></div></main>;
}
