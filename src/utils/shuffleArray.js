// shuffleArray.js

export function shuffleArray(array) {
  if (!array) {
    return;
  }

  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
