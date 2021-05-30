export default function convertMinutesToHour(minutes: number) {
  const hour = String(Math.trunc(minutes / 60)).padStart(2, '0');
  const minute = String(minutes % 60).padStart(2, '0');

  const hourFormated = `${hour}:${minute}`;

  return hourFormated;
}
