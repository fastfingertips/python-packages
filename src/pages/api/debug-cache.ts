import type { APIRoute } from 'astro';
import { readCache } from '../../utils/cache';

export const GET: APIRoute = async () => {
  try {
    const cache = readCache();

    // Send it back formatted for readability
    return new Response(JSON.stringify(cache, null, 2), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        // We explicitly tell browsers NOT to cache this debug endpoint
        // so it always reads the literal live state of the /tmp disk.
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate'
      }
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};
