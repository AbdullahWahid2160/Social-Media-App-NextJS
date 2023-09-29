export const format_date = (created_at: string) => {
  const [dateComponents, timeComponents] = created_at.split("T");
  const [year, month, day] = dateComponents.split("-");
  const [time, zone] = timeComponents.split("+");
  const [hours, minutes, seconds] = time.split(":");
  const date = new Date(+year, +month - 1, +day, +hours, +minutes, +seconds);
  return date;
};
