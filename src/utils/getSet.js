export const getSet = (arr1, arr2) => {
  const set = new Set(arr1);
  arr2.forEach((item) => set.add(item));
  return set;
};
