const objectToQueryString = params => (
  new URLSearchParams(params)
).toString();

export const createSearchQuery = object => (
  object && Object.values(object).length > 0
    ? `?${objectToQueryString(object)}`
    : ''
);
