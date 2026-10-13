/** Conversions pour les champs datetime-local du back-office, toujours en heure de Paris */

export function isoToParisInput(iso: string | null | undefined) {
  if (!iso) return '';
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Europe/Paris',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hourCycle: 'h23',
    })
      .formatToParts(new Date(iso))
      .map((p) => [p.type, p.value]),
  );
  return `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}`;
}

/** "2026-11-19T11:00" saisi à Paris → ISO UTC */
export function parisInputToIso(local: string) {
  const asUtc = new Date(`${local}:00Z`);
  const offset = parisOffsetMs(asUtc);
  // Deux passes pour les changements d'heure
  return new Date(asUtc.getTime() - parisOffsetMs(new Date(asUtc.getTime() - offset))).toISOString();
}

function parisOffsetMs(date: Date) {
  const paris = new Date(date.toLocaleString('en-US', { timeZone: 'Europe/Paris' }));
  const utc = new Date(date.toLocaleString('en-US', { timeZone: 'UTC' }));
  return paris.getTime() - utc.getTime();
}
