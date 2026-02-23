import type { APIRoute } from 'astro';
import { getRepoStats } from '../../utils/github';
import { libraries } from '../../data/libraries';
import { calculateRecommendationScore } from '../../utils/scoring';

export const GET: APIRoute = async ({ url }) => {
  const id = url.searchParams.get('id');

  if (!id) {
    return new Response(JSON.stringify({ error: 'Missing ID' }), { status: 400 });
  }

  const lib = libraries.find((l) => l.id === id);
  if (!lib || !lib.repo) {
    return new Response(JSON.stringify({ error: 'Library not found', id }), { status: 404 });
  }

  try {
    const stats: any = await getRepoStats(lib.repo, lib.id);
    const recommendation = calculateRecommendationScore(lib, stats);

    return new Response(
      JSON.stringify({
        ...stats,
        isRecommended: recommendation.isRecommended,
        recommendationDetails: recommendation
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          // Tell Vercel Edge Network to cache this API endpoint for 1 hour.
          // If an older request comes in up to 12 hours later, it serves the instant stale cache
          // while silently triggering a background job to fetch new data from GitHub.
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=43200'
        }
      }
    );
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
};
