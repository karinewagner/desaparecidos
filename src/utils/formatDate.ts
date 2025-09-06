const DEFAULT_TZ = "America/Sao_Paulo";

function toDate(input?: string | number | Date): Date | null {
  if (!input && input !== 0) return null;
  const tryParse = (raw: any) => new Date(raw);

  let d =
    typeof input === "string" && /^\d{4}-\d{2}-\d{2}$/.test(input)
      ? tryParse(`${input}T00:00:00`)
      : tryParse(input);

  return isNaN(d.getTime()) ? null : d;
}

export function formatDateTimeBR(
  input?: string | number | Date,
  opts?: { tz?: string }
): string {
  const d = toDate(input);
  if (!d) return "—";

  const tz = opts?.tz ?? DEFAULT_TZ;

  const datePart = new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: tz,
  }).format(d);

  const timePart = new Intl.DateTimeFormat("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: tz,
  }).format(d);

  return `${datePart} às ${timePart}`;
}

export function formatDateBR(
  input?: string | number | Date,
  opts?: { tz?: string }
): string {
  const d = toDate(input);
  if (!d) return "—";
  const tz = opts?.tz ?? DEFAULT_TZ;

  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: tz,
  }).format(d);
}
