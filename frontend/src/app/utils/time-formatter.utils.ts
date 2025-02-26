
export function getFormattedDate(date: string | Date | undefined): string {
  if (!date) return '';

  // Crea un oggetto Date a partire dalla stringa ISO
  const d = new Date(date);

  // Restituisci la data nel formato yyyy-mm-dd
  return d.toISOString().split('T')[0]; // "2025-10-10"
}

export function getFormattedTime(time: string | Date | undefined): string {
  if (!time) return  '';

  const date = new Date(time);
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return `${hours}:${minutes}`;
}
