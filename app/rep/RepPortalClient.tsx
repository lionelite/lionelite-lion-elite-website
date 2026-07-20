"use client";

import { FormEvent, useState } from "react";

type Session = {
  id: string;
  name: string;
  email: string;
  referralCode: string;
};

type Order = {
  order: string;
  customer: string;
  date: string;
  total: number;
  commission: number;
  status: string;
};

type Dashboard = {
  totalSales: number;
  totalCommission: number;
  pendingCommission: number;
  paidCommission: number;
  clicks: number;
  conversions: number;
  orders: Order[];
};

const money = (value: number) => value.toLocaleString("en-US", { style: "currency", currency: "USD" });

export default function RepPortalClient({ session, dashboard }: { session: Session | null; dashboard: Dashboard }) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/rep/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: form.get("email"), password: form.get("password") }),
    });
    const payload = await response.json();
    if (!response.ok) {
      setError(payload.error || "Unable to sign in.");
      setLoading(false);
      return;
    }
    window.location.reload();
  }

  async function logout() {
    await fetch("/api/rep/logout", { method: "POST" });
    window.location.reload();
  }

  if (!session) {
    return (
      <main className="rep-shell rep-login-shell">
        <section className="rep-login-card">
          <div className="rep-mark">LE</div>
          <p className="rep-kicker">LION ELITE WELLNESS</p>
          <h1>Rep Portal</h1>
          <p className="rep-muted">Sign in to view your referral performance, sales, commissions, and payouts.</p>
          <form onSubmit={login} className="rep-form">
            <label>Email<input name="email" type="email" autoComplete="email" required /></label>
            <label>Password<input name="password" type="password" autoComplete="current-password" required /></label>
            {error ? <p className="rep-error">{error}</p> : null}
            <button type="submit" disabled={loading}>{loading ? "Signing in…" : "Sign In"}</button>
          </form>
          <a className="rep-back" href="/">← Back to Lion Elite Wellness</a>
        </section>
      </main>
    );
  }

  const referralUrl = `https://lionelitewellness.com/?ref=${encodeURIComponent(session.referralCode)}`;
  const conversionRate = dashboard.clicks > 0 ? (dashboard.conversions / dashboard.clicks) * 100 : 0;

  return (
    <main className="rep-shell">
      <header className="rep-header">
        <div><p className="rep-kicker">LION ELITE WELLNESS</p><h1>Rep Portal</h1></div>
        <div className="rep-user"><span>{session.name}</span><button onClick={logout}>Sign Out</button></div>
      </header>

      <section className="rep-welcome">
        <div><p className="rep-muted">Welcome back</p><h2>{session.name}</h2><p>Track the business you generate and the commissions you have earned.</p></div>
        <div className="rep-code"><span>Your referral code</span><strong>{session.referralCode}</strong></div>
      </section>

      <section className="rep-link-card">
        <div><span>Referral link</span><strong>{referralUrl}</strong></div>
        <button onClick={() => navigator.clipboard.writeText(referralUrl)}>Copy Link</button>
      </section>

      <section className="rep-stats">
        <article><span>Total Sales</span><strong>{money(dashboard.totalSales)}</strong></article>
        <article><span>Total Commission</span><strong>{money(dashboard.totalCommission)}</strong></article>
        <article><span>Pending Payout</span><strong>{money(dashboard.pendingCommission)}</strong></article>
        <article><span>Paid Commission</span><strong>{money(dashboard.paidCommission)}</strong></article>
        <article><span>Referral Clicks</span><strong>{dashboard.clicks}</strong></article>
        <article><span>Conversions</span><strong>{dashboard.conversions}</strong><small>{conversionRate.toFixed(1)}% conversion rate</small></article>
      </section>

      <section className="rep-panel">
        <div className="rep-panel-head"><div><p className="rep-kicker">PERFORMANCE</p><h2>Recent Referral Orders</h2></div></div>
        <div className="rep-table-wrap">
          <table className="rep-table">
            <thead><tr><th>Order</th><th>Customer</th><th>Date</th><th>Sale</th><th>Commission</th><th>Status</th></tr></thead>
            <tbody>
              {dashboard.orders.length ? dashboard.orders.map((order) => (
                <tr key={order.order}><td>{order.order}</td><td>{order.customer}</td><td>{order.date}</td><td>{money(order.total)}</td><td>{money(order.commission)}</td><td><span className={`rep-status ${order.status.toLowerCase()}`}>{order.status}</span></td></tr>
              )) : <tr><td colSpan={6} className="rep-empty">No referral orders have been recorded yet.</td></tr>}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rep-panel rep-help">
        <div><p className="rep-kicker">REP RESOURCES</p><h2>How referrals are tracked</h2></div>
        <p>Share your unique referral link or referral code. Eligible orders attributed to your account appear here once the order system confirms the sale. Commission and payout status are calculated from the connected Lion Elite sales backend.</p>
      </section>
    </main>
  );
}
