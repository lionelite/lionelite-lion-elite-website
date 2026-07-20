import { cookies } from "next/headers";
import { verifyRepSession } from "@/lib/rep-auth";
import RepPortalClient from "./RepPortalClient";
import "./rep.css";

type Dashboard = {
  totalSales: number;
  totalCommission: number;
  pendingCommission: number;
  paidCommission: number;
  clicks: number;
  conversions: number;
  orders: Array<{
    order: string;
    customer: string;
    date: string;
    total: number;
    commission: number;
    status: string;
  }>;
};

const emptyDashboard: Dashboard = {
  totalSales: 0,
  totalCommission: 0,
  pendingCommission: 0,
  paidCommission: 0,
  clicks: 0,
  conversions: 0,
  orders: [],
};

function getDashboard(repId?: string): Dashboard {
  if (!repId) return emptyDashboard;
  const raw = process.env.REP_PORTAL_DATA_JSON;
  if (!raw) return emptyDashboard;
  try {
    const parsed = JSON.parse(raw) as Record<string, Dashboard>;
    return parsed[repId] || emptyDashboard;
  } catch {
    return emptyDashboard;
  }
}

export const metadata = {
  title: "Rep Portal — Lion Elite Wellness",
  description: "Lion Elite Wellness representative sales and commission portal.",
};

export default async function RepPortalPage() {
  const cookieStore = await cookies();
  let session = null;
  try {
    session = verifyRepSession(cookieStore.get("le_rep_session")?.value);
  } catch {
    session = null;
  }

  const safeSession = session ? {
    id: session.id,
    name: session.name,
    email: session.email,
    referralCode: session.referralCode,
  } : null;

  return <RepPortalClient session={safeSession} dashboard={getDashboard(session?.id)} />;
}
