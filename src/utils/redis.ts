import { Redis } from '@upstash/redis';
import { cache } from 'react';
import superjson from 'superjson';

import { env } from '@/env';

export const redis = new Redis({
  url: env.UPSTASH_REDIS_REST_URL,
  token: env.UPSTASH_REDIS_REST_TOKEN,
});

export const cached = cache(async <T>(key: string, fetchFn: () => Promise<T>, ttl = 60): Promise<T> => {
  const cached = await redis.get(key);

  if (cached !== null && typeof cached === 'string') {
    return superjson.parse(cached);
  }

  const result = await fetchFn();

  const serialized = superjson.stringify(result);

  await redis.set(key, serialized, { ex: ttl });
  return result;
});
