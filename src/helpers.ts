

export const toQueryString = (obj: Record<string, any>) => {
  return Object.entries(obj)
    .filter(([_, value]) => value !== "" && value != null)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
};
