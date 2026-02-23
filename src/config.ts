export const REGISTRY_CONFIG = {
  site: {
    title: 'Python Packages Registry',
    description: 'A curated dashboard of modern Python libraries.'
  },
  thresholds: {
    staleReleaseDays: 180,
    staleUpdateDays: 180
  },
  ttl: {
    shipment: 2 * 60 * 60 * 1000,
    commit: 6 * 60 * 60 * 1000,
    stars: 12 * 60 * 60 * 1000,
    description: 24 * 60 * 60 * 1000
  },
  scoring: {
    basePoints: {
      preferred: 80,
      essential: 40
    },
    activityPoints: {
      recentUpdate: { days: 30, points: 20 },
      recentRelease: { days: 90, points: 50 },
      veryRecentRelease: { days: 30, points: 30 },
      highStars: { count: 20000, points: 30 }
    },
    deductionPoints: {
      legacyStatus: -40,
      staleUpdate: { days: 180, points: -30 },
      staleRelease: { days: 365, points: -40 }
    },
    recommendationThreshold: 130,
    warningThreshold: 0
  },
  repoRedirects: {
    'sparacy/robyn': 'sansyrox/robyn',
    'D4Vinci/Scrapling': 'D4Vinci/Scrapling'
  } as Record<string, string>
};
