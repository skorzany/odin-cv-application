function formatName(name) {
  let words = name.trim().split(/ - |-/); // in my country some people have 'Two-Word' names and surnames
  words = words.map(
    (word) => word.slice(0, 1).toUpperCase() + word.slice(1).toLowerCase(),
  );
  return words.join('-');
}

function formatEmail(email) {
  return email.trim().toLowerCase();
}

function formatPhone(phone) {
  return phone && `${phone.slice(0, 3)} ${phone.slice(3, 6)} ${phone.slice(6)}`;
}

function formatDate(date) {
  const MONTHS = [
    // month abbreviations according to the Yale University
    'Jan.',
    'Feb.',
    'Mar.',
    'Apr.',
    'May',
    'June',
    'July',
    'Aug.',
    'Sept.',
    'Oct.',
    'Nov.',
    'Dec.',
  ];
  const parts = date.split('-');
  return `${MONTHS[Number(parts[1]) - 1]} ${parts[0]}`;
}

export { formatName, formatEmail, formatPhone, formatDate };
