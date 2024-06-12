export const getLettersSet = (array) => {
 const newAr =  array.map((word) => {
    const obj = {};
    word.split('').forEach((letter) => {
      obj[letter] ? ++obj[letter] : obj[letter] = 1
    });
    return obj
  });

  const mergedObject = newAr.reduce((acc, obj) => {
    return { ...acc, ...obj };
  }, {});

  const resultArray = Object.entries(mergedObject).flatMap(([letter, count]) => Array.from({ length: count }, () => letter));
  return resultArray;
};
