const componentToHex = (c) => {
  var hex = c.toString(16);
  return hex.length == 1 ? '0' + hex : hex;
};

export const rgbToHex = (rgb) => {
  return '#' + componentToHex(rgb.r) + componentToHex(rgb.g) + componentToHex(rgb.b);
};
