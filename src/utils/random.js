export const randomInt = (min, max) => {
  return min + Math.floor((max - min) * Math.random());
};

export const randomColor = () => {
  return {
    r: randomInt(0, 255),
    g: randomInt(0, 255),
    b: randomInt(0, 255),
  };
};
