import EnterStore from "../Store/EnterStore";
import styles from '../Components/LettersBlock/LettersBlock.module.scss'

export const checkElementUnderCursor = (e, ref) => {
  const { positions, setPositions, setEnter } = EnterStore.getState();
  const canvas = ref.current;
  const x = e.touches ? e.touches[0].clientX : e.clientX;
  const y = e.touches ? e.touches[0].clientY : e.clientY;
  canvas.style.visibility = "hidden";
  const element = document.elementFromPoint(x, y);
  canvas.style.visibility = "visible";
  if (element && element.tagName === "SPAN" && element.parentElement.id === "center") {
    const container = document.getElementById("canvas");
    const blockRect = container.getBoundingClientRect();
    const spanRect = element.getBoundingClientRect();
    const spanX = spanRect.left - blockRect.left + spanRect.width / 2;
    const spanY = spanRect.top - blockRect.top + spanRect.height / 2;
    
    if (!positions?.find((item) => item.x === spanX && item.y === spanY)) {
      setPositions({ x: spanX, y: spanY });
      setEnter(element.textContent)
      element.classList.add(styles.hovered);
      return { x: spanX, y: spanY };
    }
    
  }

  return null;
};


export const returnDefaultStyle = () => {
  const spans = document.querySelectorAll('span')
  spans.forEach(span => {
    if(span.parentElement.id === "center"){
      span.classList.remove(styles.hovered);
    }
  });
}