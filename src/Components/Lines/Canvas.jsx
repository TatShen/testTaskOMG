import { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getCoordinates } from "../../utils/getCoordinates";
import { checkElementUnderCursor, returnDefaultStyle } from "../../utils/checkElementUnderCursor";
import { useStore } from "zustand";
import EnterStore from "../../Store/EnterStore";

const Canvas = ({ className}) => {
  const canvasRef = useRef(null);
  const {clearPositions, setEnter, setUsersWords} = useStore(EnterStore)
  const [drawing, setDrawing] = useState(false);
  const [lines, setLines] = useState([]);
  const [startPoint, setStartPoint] = useState({ x: 0, y: 0 });
  const [endPoint, setEndPoint] = useState({ x: 0, y: 0 });
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const updateCanvasSize = () => {
      const { width, height } = canvas.getBoundingClientRect();
      setCanvasSize({ width, height });
    };
    window.addEventListener("resize", updateCanvasSize);
    updateCanvasSize();

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = "#638ec4";
    ctx.lineWidth = 15;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

  }, []);

  const handleStart = (e) => {
    const letterCoordinates = checkElementUnderCursor(e, canvasRef); 
    if (letterCoordinates) {
      setStartPoint(letterCoordinates);
      setEndPoint(letterCoordinates);
      setDrawing(true);
    }
  };

  const handleMove = (e) => {
    if (drawing) {
      const coordinates = getCoordinates(e, canvasRef);
      const letterCoordinates = checkElementUnderCursor(e, canvasRef);
      if (letterCoordinates) {
        setLines([...lines, { startPoint, endPoint: letterCoordinates }]);
        setStartPoint(letterCoordinates);
        setEndPoint(letterCoordinates);
      } else {
        setEndPoint(coordinates);
      }
      draw();
    }
  };

  const handleEnd = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (drawing) {
      setLines([]);
      setStartPoint({ x: 0, y: 0 })
      setEndPoint({ x: 0, y: 0 })
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      returnDefaultStyle()
      setUsersWords()
      clearPositions()
      setEnter()
      setDrawing(false);
    }
  };

  const draw = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = "#638ec4";
    ctx.lineWidth = 15;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    lines.forEach((line) => {
      ctx.beginPath();
      ctx.moveTo(line.startPoint.x, line.startPoint.y);
      ctx.lineTo(line.endPoint.x, line.endPoint.y);
      ctx.stroke();
    });

    if (startPoint && endPoint) {
      ctx.beginPath();
      ctx.moveTo(startPoint.x, startPoint.y);
      ctx.lineTo(endPoint.x, endPoint.y);
      ctx.stroke();
    }
  };


  return (
    <canvas
      onMouseDown={(e) => handleStart(e)}
      onTouchStart={(e) => handleStart(e)}
      onMouseMove={(e) => handleMove(e)}
      onTouchMove={(e) => handleMove(e)}
      onMouseUp={handleEnd}
      onTouchEnd={handleEnd}
      onMouseLeave={handleEnd}
      onTouchCancel={handleEnd}
      ref={canvasRef}
      className={className}
      width={canvasSize.width}
      height={canvasSize.height}
      style={{ width: "100%", height: "100%" }}
      id="canvas"
    />
  );
};

export default Canvas;

Canvas.propTypes = {
  className: PropTypes.string,
  isDraw: PropTypes.bool
};
