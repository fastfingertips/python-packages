export function formatExactTime(dateString: string): string {
  const diffMs = Date.now() - new Date(dateString).getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 60) return `${diffMins || 1}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 30) return `${diffDays}d ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)}mo ago`;
  return `${Math.floor(diffDays / 365)}y ago`;
}

export function getCacheAgeText(timestamp: number | undefined): string {
  if (!timestamp) return '';
  const ageMins = Math.floor((Date.now() - timestamp) / 60000);
  if (ageMins < 1) return 'live data';
  if (ageMins < 60) return `${ageMins}m ago`;
  return `${Math.floor(ageMins / 60)}h ${ageMins % 60}m ago`;
}
