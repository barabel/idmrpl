export const getRandomElementFromArray = <T>(arr: T[]): T => {
  if (arr.length === 0) {
    throw new Error(`Массив не содержит элементов`);
  }

  const randomIndex = Math.floor(Math.random() * arr.length);

  return arr[randomIndex];
};
