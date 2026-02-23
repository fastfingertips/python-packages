import { REGISTRY_CONFIG } from '../config';

export function calculateRecommendationScore(lib: any, stats: any) {
  let score = 0;
  const config = REGISTRY_CONFIG.scoring;
  const reasons: string[] = [];

  if (lib.status === 'preferred') {
    score += config.basePoints.preferred;
    reasons.push(`Preferred Status (+${config.basePoints.preferred})`);
  } else if (lib.status === 'essential') {
    score += config.basePoints.essential;
    reasons.push(`Essential Status (+${config.basePoints.essential})`);
  } else if (lib.status === 'legacy') {
    score += config.deductionPoints.legacyStatus;
    reasons.push(`Legacy Status (${config.deductionPoints.legacyStatus})`);
  }

  if (stats) {
    if (stats.daysSinceUpdate < config.activityPoints.recentUpdate.days) {
      score += config.activityPoints.recentUpdate.points;
      reasons.push(`Recent Push (+${config.activityPoints.recentUpdate.points})`);
    } else if (stats.daysSinceUpdate > config.deductionPoints.staleUpdate.days) {
      score += config.deductionPoints.staleUpdate.points;
      reasons.push(`Stale Push (${config.deductionPoints.staleUpdate.points})`);
    }

    if (stats.daysSinceRelease !== null) {
      if (stats.daysSinceRelease < config.activityPoints.recentRelease.days) {
        score += config.activityPoints.recentRelease.points;
        reasons.push(`Recent Release (+${config.activityPoints.recentRelease.points})`);
      }
      if (stats.daysSinceRelease < config.activityPoints.veryRecentRelease.days) {
        score += config.activityPoints.veryRecentRelease.points;
        reasons.push(`Active Releases (+${config.activityPoints.veryRecentRelease.points})`);
      }
      if (stats.daysSinceRelease > config.deductionPoints.staleRelease.days) {
        score += config.deductionPoints.staleRelease.points;
        reasons.push(`Stale Release (${config.deductionPoints.staleRelease.points})`);
      }
    } else {
      score += config.deductionPoints.staleRelease.points;
      reasons.push(`No Release Data (${config.deductionPoints.staleRelease.points})`);
    }

    if (stats.stars > config.activityPoints.highStars.count) {
      score += config.activityPoints.highStars.points;
      reasons.push(`High Stars (+${config.activityPoints.highStars.points})`);
    }
  }

  let badgeType: 'REC' | 'WARN' | null = null;
  if (score >= config.recommendationThreshold) badgeType = 'REC';
  else if (score <= config.warningThreshold) badgeType = 'WARN';

  return {
    isRecommended: badgeType === 'REC',
    badge: badgeType,
    score,
    reasons
  };
}
