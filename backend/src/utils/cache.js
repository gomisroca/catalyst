import NodeCache from 'node-cache';

export const usersCache = new NodeCache({ stdTTL: 60 * 5 });
export const projectsCache = new NodeCache({ stdTTL: 60 * 5 });

export async function fetchFromCacheOrDB(cache, cacheKey, dbQuery) {
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }
  const result = await dbQuery();
  if (result) {
    cache.set(cacheKey, result);
  }
  return result;
}
