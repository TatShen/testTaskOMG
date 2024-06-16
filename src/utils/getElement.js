export const getElementByCenterCoordinates = (x, y) => {
  const canvas = document.getElementById("canvas");
  canvas.style.visibility = "hidden";
  const element = document.elementFromPoint(x, y);
  canvas.style.visibility = "visible";
  return element
};
