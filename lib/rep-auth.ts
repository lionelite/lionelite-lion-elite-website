import { createHash, createHmac, timingSafeEqual } from "crypto";

export type RepUser = {
  id: string;
  name: string;
  email: string;
  password: string;
  referralCode: string;
};

type BuiltInRepUser = Omit<RepUser, "password"> & {
  passwordHash: string;
};

export type RepSession = Omit<RepUser, "password"> & { exp: number };

const BUILT_IN_REPS: BuiltInRepUser[] = [
  {
    id: "rep-rilla",
    name: "Jaqualeen Brooks",
    email: "quabrooks24@icloud.com",
    referralCode: "Rilla99",
    passwordHash: "baaca9a4df612ba23f477a2f5065b3746973c1033344b1efdd1817288416b812",
  },
];

function secret() {
  const value = process.env.REP_PORTAL_SECRET;
  if (!value) throw new Error("REP_PORTAL_SECRET is not configured");
  return value;
}

export function getRepUsers(): RepUser[] {
  const raw = process.env.REP_PORTAL_USERS_JSON;
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function verifyBuiltInPassword(password: string, expectedHash: string) {
  const actual = createHash("sha256").update(password).digest();
  const expected = Buffer.from(expectedHash, "hex");
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}

export function authenticateRep(email: string, password: string): RepSession | null {
  const envUser = getRepUsers().find((item) => item.email.toLowerCase() === email.toLowerCase());
  if (envUser && envUser.password === password) {
    const { password: _password, ...safeUser } = envUser;
    return { ...safeUser, exp: Date.now() + 1000 * 60 * 60 * 24 * 7 };
  }

  const builtInUser = BUILT_IN_REPS.find((item) => item.email.toLowerCase() === email.toLowerCase());
  if (!builtInUser || !verifyBuiltInPassword(password, builtInUser.passwordHash)) return null;

  const { passwordHash: _passwordHash, ...safeUser } = builtInUser;
  return { ...safeUser, exp: Date.now() + 1000 * 60 * 60 * 24 * 7 };
}

export function signRepSession(session: RepSession): string {
  const payload = Buffer.from(JSON.stringify(session)).toString("base64url");
  const signature = createHmac("sha256", secret()).update(payload).digest("base64url");
  return `${payload}.${signature}`;
}

export function verifyRepSession(token?: string | null): RepSession | null {
  if (!token) return null;
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return null;
  const expected = createHmac("sha256", secret()).update(payload).digest("base64url");
  const left = Buffer.from(signature);
  const right = Buffer.from(expected);
  if (left.length !== right.length || !timingSafeEqual(left, right)) return null;
  try {
    const session = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as RepSession;
    if (!session.exp || session.exp < Date.now()) return null;
    return session;
  } catch {
    return null;
  }
}
