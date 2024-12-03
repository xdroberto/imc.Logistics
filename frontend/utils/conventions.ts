export const DATE_FORMAT = {
  day: '2-digit',
  month: 'long',
  year: 'numeric'
} as const;

export const DATE_LOCALE = 'en-US';

export function formatDate(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString(DATE_LOCALE, DATE_FORMAT);
}

