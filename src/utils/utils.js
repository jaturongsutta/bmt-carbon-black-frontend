export function generateRange(a, b) {
  const result = [];
  for (let i = a; i <= b; i++) {
    result.push(i);
  }
  return result;
}

export function arrayIntersectionAndDifference(a, b) {
  const intersection = b.filter((item) => a.includes(item));
  const difference = b.filter((item) => !a.includes(item));

  return { intersection, difference };
}

export function getPaging({ page, itemsPerPage, sortBy }) {
  const rowFrom = page * itemsPerPage - itemsPerPage + 1;
  const rowTo = page * itemsPerPage;
  const orderField =
    sortBy === undefined || sortBy === null || sortBy.length === 0
      ? null
      : sortBy[0].key;
  const orderBy =
    sortBy === undefined || sortBy === null || sortBy.length === 0
      ? null
      : sortBy[0].order;
  return { rowFrom, rowTo, orderField, orderBy, page, itemsPerPage, sortBy };
}
