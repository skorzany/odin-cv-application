function centuryYears() {
  // returns an array of hundred years from today, descending
  const currentYear = new Date().getFullYear();
  const centuryAgo = currentYear - 100;
  const years = [];
  for (let year = currentYear; year >= centuryAgo; year -= 1) years.push(year);
  return years;
}

function centuryDays() {
  // returns object with two date strings: a day 100 years ago and today
  const dateObj = new Date();
  const today = dateObj.toISOString().split('T')[0];
  dateObj.setFullYear(dateObj.getFullYear() - 100);
  const past = dateObj.toISOString().split('T')[0];
  return { past, today };
}

export { centuryYears, centuryDays };
