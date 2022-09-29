const objectToQueryString = params => (
  new URLSearchParams(params)
).toString();

export const createSearchQuery = object => (
  object && Object.values(object).length > 0
    ? `?${objectToQueryString(object)}`
    : ''
);


export const getSearchQuery = (strParams) => {
  const urlSearchParams = new URLSearchParams(strParams)
  const objParams = {}
  for (const [key, value] of urlSearchParams) {
    objParams[key] = value
  }
  return objParams
};
