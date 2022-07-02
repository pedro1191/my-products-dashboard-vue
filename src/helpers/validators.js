export const maxSize = (sizeInKB) => (value) => {
  if (!value) return true;
  return value.size <= sizeInKB;
};
