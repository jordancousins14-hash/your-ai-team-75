// Curated timezone list grouped by region. Values are IANA tz identifiers.
export type TimezoneOption = { value: string; label: string; group: string };

export const TIMEZONES: TimezoneOption[] = [
  { value: "UTC", label: "UTC", group: "Universal" },
  // Europe
  { value: "Europe/London", label: "London (GMT/BST)", group: "Europe" },
  { value: "Europe/Dublin", label: "Dublin", group: "Europe" },
  { value: "Europe/Paris", label: "Paris", group: "Europe" },
  { value: "Europe/Berlin", label: "Berlin", group: "Europe" },
  { value: "Europe/Madrid", label: "Madrid", group: "Europe" },
  { value: "Europe/Amsterdam", label: "Amsterdam", group: "Europe" },
  { value: "Europe/Stockholm", label: "Stockholm", group: "Europe" },
  // Americas
  { value: "America/New_York", label: "New York (ET)", group: "Americas" },
  { value: "America/Chicago", label: "Chicago (CT)", group: "Americas" },
  { value: "America/Denver", label: "Denver (MT)", group: "Americas" },
  { value: "America/Los_Angeles", label: "Los Angeles (PT)", group: "Americas" },
  { value: "America/Toronto", label: "Toronto", group: "Americas" },
  { value: "America/Sao_Paulo", label: "São Paulo", group: "Americas" },
  // Asia / Pacific
  { value: "Asia/Dubai", label: "Dubai", group: "Asia / Pacific" },
  { value: "Asia/Kolkata", label: "Mumbai / Kolkata", group: "Asia / Pacific" },
  { value: "Asia/Singapore", label: "Singapore", group: "Asia / Pacific" },
  { value: "Asia/Hong_Kong", label: "Hong Kong", group: "Asia / Pacific" },
  { value: "Asia/Tokyo", label: "Tokyo", group: "Asia / Pacific" },
  { value: "Australia/Sydney", label: "Sydney", group: "Asia / Pacific" },
  { value: "Pacific/Auckland", label: "Auckland", group: "Asia / Pacific" },
];

export function formatInTimezone(date: Date, timezone: string, locale: string) {
  try {
    return new Intl.DateTimeFormat(locale, {
      timeZone: timezone,
      dateStyle: "medium",
      timeStyle: "short",
    }).format(date);
  } catch {
    return date.toISOString();
  }
}
