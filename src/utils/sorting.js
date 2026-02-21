function schoolComparisonFn(a, b) {
  // sort by required fields: graduation date (desc),
  // then school name (asc).
  // Finally, older entry first (lower id).
  const cleanA = {
    ...a,
    name: a.name.trim().toLowerCase(),
  };
  const cleanB = {
    ...b,
    name: b.name.trim().toLowerCase(),
  };
  if (a.graduation !== b.graduation) return b.graduation - a.graduation;
  if (cleanA.name !== cleanB.name)
    return cleanA.name.localeCompare(cleanB.name);
  return a.id - b.id;
}

function jobComparisonFn(a, b) {
  // sort by dates (desc, current positions on top),
  // then company (asc),
  // then position (asc).
  // Finally, older entry first (lower id)
  const cleanA = {
    ...a,
    endDate: a.endDate === '' ? '9999-12-12' : a.endDate,
    company: a.company.trim().toLowerCase(),
    position: a.position.trim().toLowerCase(),
  };
  const cleanB = {
    ...b,
    endDate: b.endDate === '' ? '9999-12-12' : b.endDate,
    company: b.company.trim().toLowerCase(),
    position: b.position.trim().toLowerCase(),
  };
  if (cleanA.endDate !== cleanB.endDate)
    return cleanB.endDate.localeCompare(cleanA.endDate);
  if (a.startDate !== b.startDate)
    return b.startDate.localeCompare(a.startDate);
  if (cleanA.company !== cleanB.company)
    return cleanA.company.localeCompare(cleanB.company);
  if (cleanA.position !== cleanB.position)
    return cleanA.position.localeCompare(cleanB.position);
  return a.id - b.id;
}

export { schoolComparisonFn, jobComparisonFn };
