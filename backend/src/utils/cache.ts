import NodeCache from 'node-cache';

export const usersCache = new NodeCache({ stdTTL: 60 * 5 });
export const projectsCache = new NodeCache({ stdTTL: 60 * 5 });
export const branchesCache = new NodeCache({ stdTTL: 60 * 5 });
export const postsCache = new NodeCache({ stdTTL: 60 * 5 });

/**
 * Fetch data from cache or execute a database query if not found in cache.
 * @param cache - The NodeCache instance.
 * @param cacheKey - The key to search in the cache.
 * @param dbQuery - A function that fetches data from the database.
 * @returns The cached or database result.
 */
export async function fetchFromCacheOrDB<T>(
  cache: NodeCache,
  cacheKey: string,
  dbQuery: () => Promise<T>
): Promise<T | undefined> {
  if (cache.has(cacheKey)) {
    return cache.get<T>(cacheKey);
  }
  const result = await dbQuery();
  if (result) {
    cache.set(cacheKey, result);
  }
  return result;
}
