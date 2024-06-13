export const getLettersSet = (array) => {
 const newAr =  array.map((word) => {
    const obj = {};
    word.split('').forEach((letter) => {
      obj[letter] ? ++obj[letter] : obj[letter] = 1
    });
    
    return obj
  });
 
  const mergedObject = newAr.reduce((acc, obj) => {
    for (const [key, value] of Object.entries(obj)) {
      if (!acc[key] || value > acc[key]) {
        acc[key] = value;
      }
    }
    return acc;
  }, {});
  const resultArray = Object.entries(mergedObject).flatMap(([letter, count]) => Array.from({ length: count }, () => letter));
  return resultArray.sort(() => Math.random() - 0.5);
};
