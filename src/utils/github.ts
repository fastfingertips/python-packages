import { readCache, writeCache, TTL_CONFIG, type CacheEntry } from './cache';
import { REGISTRY_CONFIG } from '../config';

export async function getRepoStats(repo: string, id: string): Promise<CacheEntry | null> {
  const cache = readCache();
  const cachedEntry = cache[id];
  const now = Date.now();
  const legacyTs = cachedEntry?.timestamp || 0;

  const ts = cachedEntry?.timestamps || {
    shipment: legacyTs,
    commit: legacyTs,
    stars: legacyTs,
    description: legacyTs
  };

  const needsRepoFetch =
    !cachedEntry ||
    now - ts.commit > TTL_CONFIG.commit ||
    now - ts.stars > TTL_CONFIG.stars ||
    now - ts.description > TTL_CONFIG.description;

  const needsShipmentFetch = !cachedEntry || now - ts.shipment > TTL_CONFIG.shipment;

  if (!needsRepoFetch && !needsShipmentFetch && cachedEntry) {
    return cachedEntry;
  }

  const headers: Record<string, string> = {
    Accept: 'application/vnd.github.v3+json',
    'User-Agent': 'Astro-Registry-Bot'
  };

  const targetRepo = REGISTRY_CONFIG.repoRedirects[repo] || repo;
  let newStars = cachedEntry?.stars || 0;
  let newUpdate = cachedEntry?.lastUpdate || new Date().toISOString();
  let newDesc = cachedEntry?.description || null;
  let newRelease = cachedEntry?.lastRelease || null;

  try {
    if (needsRepoFetch) {
      const repoRes = await fetch(`https://api.github.com/repos/${targetRepo}`, { headers });
      if (!repoRes.ok) throw new Error(`Repo fetch failed (HTTP ${repoRes.status})`);
      const repoData = await repoRes.json();

      newStars = repoData.stargazers_count;
      newUpdate = repoData.pushed_at;
      newDesc = repoData.description;

      ts.commit = now;
      ts.stars = now;
      ts.description = now;
    }

    if (needsShipmentFetch) {
      const releasesRes = await fetch(
        `https://api.github.com/repos/${targetRepo}/releases?per_page=1`,
        { headers }
      );
      if (releasesRes.ok) {
        const releases = await releasesRes.json();
        if (releases.length > 0) newRelease = releases[0].published_at;
      }

      if (!newRelease) {
        const tagsRes = await fetch(`https://api.github.com/repos/${targetRepo}/tags?per_page=1`, {
          headers
        });
        if (tagsRes.ok) {
          const tags = await tagsRes.json();
          if (tags.length > 0) {
            const commitRes = await fetch(tags[0].commit.url, { headers });
            if (commitRes.ok) {
              const commitData = await commitRes.json();
              newRelease = commitData.commit.committer.date;
            }
          }
        }
      }

      ts.shipment = now;
    }

    const updatedEntry: CacheEntry = {
      stars: newStars,
      lastUpdate: newUpdate,
      lastRelease: newRelease,
      description: newDesc,
      daysSinceUpdate: Math.floor((now - new Date(newUpdate).getTime()) / (1000 * 60 * 60 * 24)),
      daysSinceRelease: newRelease
        ? Math.floor((now - new Date(newRelease).getTime()) / (1000 * 60 * 60 * 24))
        : null,
      timestamps: ts,
      isStale: false
    };

    writeCache(id, updatedEntry);
    return updatedEntry;
  } catch (e) {
    console.warn(
      `[Stats] Could not refresh metrics for ${repo}. ${e instanceof Error ? e.message : 'Unknown error'}`
    );
    if (cachedEntry) {
      return { ...cachedEntry, isStale: true };
    }
    return null;
  }
}
