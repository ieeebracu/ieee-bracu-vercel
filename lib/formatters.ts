// Hoisted Intl.DateTimeFormat instances initialized once at module scope.
// This prevents expensive locale resolution and pattern compilation on every item in loops / render passes.

const shortDateFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "short",
  day: "numeric",
});

const longDateFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

/**
 * Formats a Unix timestamp (in seconds) into a short date string (e.g. "Sep 25, 2026").
 * Returns an empty string if timestamp is null, undefined, or invalid.
 */
export function formatShortDate(timestamp: number | null | undefined): string {
  if (timestamp == null || isNaN(timestamp)) return "";
  try {
    const ms = timestamp > 1e11 ? timestamp : timestamp * 1000;
    return shortDateFormatter.format(new Date(ms));
  } catch {
    return "";
  }
}

/**
 * Formats a Unix timestamp (in seconds) into a long date string (e.g. "September 25, 2026").
 * Returns an empty string if timestamp is null, undefined, or invalid.
 */
export function formatLongDate(timestamp: number | null | undefined): string {
  if (timestamp == null || isNaN(timestamp)) return "";
  try {
    const ms = timestamp > 1e11 ? timestamp : timestamp * 1000;
    return longDateFormatter.format(new Date(ms));
  } catch {
    return "";
  }
}

/**
 * Default date formatter alias (short month, e.g. "Sep 25, 2026").
 */
export const formatDate = formatShortDate;
