export const getElementByCenterCoordinates = (x, y) => {
  const canvas = document.getElementById("canvas");
  canvas.style.visibility = "hidden";
  let element = document.elementFromPoint(x, y);
  canvas.style.visibility = "visible";
  let deepestElement = element;

  while (element) {
    element = Array.from(element.children).find(child => {
      const rect = child.getBoundingClientRect();
      return (
        x >= rect.left &&
        x <= rect.right &&
        y >= rect.top &&
        y <= rect.bottom
      );
    });

    if (element) {
      deepestElement = element;
    }
  }

  return deepestElement;
};
