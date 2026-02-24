import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { REGISTRY_CONFIG } from '../config';

const CACHE_DIR = process.env.VERCEL ? os.tmpdir() : path.join(process.cwd(), '.cache');
const CACHE_FILE = path.join(CACHE_DIR, 'github-stats.json');

export const TTL_CONFIG = REGISTRY_CONFIG.ttl;

export interface CacheTimestamps {
  shipment: number;
  commit: number;
  stars: number;
  description: number;
}

export interface CacheEntry {
  stars: number;
  lastUpdate: string;
  lastRelease: string | null;
  description: string | null;
  daysSinceUpdate: number;
  daysSinceRelease: number | null;
  timestamps: CacheTimestamps;
  isStale?: boolean;
  timestamp?: number;
}

export interface CacheData {
  [key: string]: CacheEntry;
}

export function readCache(): CacheData {
  if (!fs.existsSync(CACHE_FILE)) return {};
  try {
    return JSON.parse(fs.readFileSync(CACHE_FILE, 'utf-8'));
  } catch {
    return {};
  }
}

export function writeCache(id: string, entry: CacheEntry) {
  const cache = readCache();
  cache[id] = entry;

  if (!fs.existsSync(path.dirname(CACHE_FILE))) {
    fs.mkdirSync(path.dirname(CACHE_FILE), { recursive: true });
  }
  fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2));
}

export function getCacheMeta() {
  const cache = readCache();
  return Object.keys(cache).map((id) => {
    const legacyTs = cache[id].timestamp || 0;
    const ts = cache[id].timestamps || { 
      shipment: legacyTs, 
      commit: legacyTs, 
      stars: legacyTs, 
      description: legacyTs 
    };

    let oldestTimestamp = ts.shipment || 0;
    let oldestPart = 'shipment';

    if ((ts.commit || 0) < oldestTimestamp) {
      oldestTimestamp = ts.commit || 0;
      oldestPart = 'commit';
    }
    if ((ts.stars || 0) < oldestTimestamp) {
      oldestTimestamp = ts.stars || 0;
      oldestPart = 'stars';
    }
    if ((ts.description || 0) < oldestTimestamp) {
      oldestTimestamp = ts.description || 0;
      oldestPart = 'description';
    }

    return {
      id,
      timestamp: oldestTimestamp,
      oldestPart: oldestTimestamp === 0 ? 'partial update' : oldestPart
    };
  });
}
