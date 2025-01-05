import NodeCache from 'node-cache';

export const usersCache = new NodeCache({ stdTTL: 60 * 5 });
