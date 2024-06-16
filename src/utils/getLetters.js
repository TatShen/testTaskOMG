export const getLetters = (array) => {
  const lettersObjects = array.map((word) => (
    word.split('').reduce((acc, letter) => {
        acc[letter] = (acc[letter]  || 0) + 1;
        return acc;
    }, {})
));

const mergedObject = lettersObjects.reduce((acc, obj) => {
    for (const [key, value] of Object.entries(obj)) {
        if (!(key in acc) ||  value > acc[key]) {
            acc[key] = value;
        }
    }
    return acc;
}, {});

return Object.entries(mergedObject)
    .flatMap(([letter, count]) => Array(count).fill(letter))
    .sort(() => Math.random() - 0.5);
 
};
