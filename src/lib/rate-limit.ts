// Simple rate limiting (in-memory, resets on cold start — use Upstash Redis for production)
export const requestCounts = new Map<string, { count: number; resetAt: number }>();

export function rateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60_000; // 1 minute
  const limit = 5;
  const entry = requestCounts.get(ip);
  if (!entry || entry.resetAt < now) {
    requestCounts.set(ip, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (entry.count >= limit) return false;
  entry.count++;
  return true;
}
