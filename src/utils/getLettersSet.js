export const getLettersSet = (array) => {
  const resultArray = [];
  const mergedObject = {};
  const newAr = array.map((word) => {
    const obj = {};
    for (const letter of word) {
      obj[letter] = (obj[letter] || 0) + 1;
    }
    return obj;
  });
  newAr.forEach((obj) => {
    for (const [key, value] of Object.entries(obj)) {
      if (!(key in mergedObject) || value > mergedObject[key]) {
        mergedObject[key] = value;
      }
    }
  });

  for (const [letter, count] of Object.entries(mergedObject)) {
    resultArray.push(...Array(count).fill(letter));
  }
  return resultArray.sort(() => Math.random() - 0.5);
};
