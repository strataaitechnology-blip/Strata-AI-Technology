/**
 * Tiny in-memory sliding-window rate limiter.
 *
 * Good enough to blunt casual abuse of the contact endpoint on a single
 * server instance. On serverless / multi-instance hosting, memory is not
 * shared — use a shared store (e.g. Redis/Upstash) for stricter limits.
 */
const hits = new Map<string, number[]>();

export function isRateLimited(key: string, limit = 5, windowMs = 10 * 60 * 1000): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((time) => now - time < windowMs);

  if (recent.length >= limit) {
    hits.set(key, recent);
    return true;
  }

  recent.push(now);
  hits.set(key, recent);

  // Opportunistic cleanup so the map cannot grow forever.
  if (hits.size > 500) {
    for (const [k, times] of hits) {
      if (times.every((time) => now - time >= windowMs)) hits.delete(k);
    }
  }
  return false;
}
