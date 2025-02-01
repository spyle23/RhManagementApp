export const calculDuration = (date1: Date, date2: Date) => {
  const diff = date2.getTime() - date1.getTime();

  return Math.floor(diff / (1000 * 60 * 60 * 24));
};
