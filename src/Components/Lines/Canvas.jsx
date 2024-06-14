import { useRef, useEffect, useState} from 'react';
import PropTypes from "prop-types";
import { useStore } from 'zustand';
import EnterStore from '../../Store/EnterStore';

const Canvas = ({ className }) => {
    const canvasRef = useRef(null);
    const {positions} = useStore(EnterStore)
    const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const updateCanvasSize = () => {
            const { width, height } = canvas.getBoundingClientRect();
            setCanvasSize({ width, height });
          };
          window.addEventListener('resize', updateCanvasSize);
          updateCanvasSize();
       
        ctx.clearRect(0, 0, canvas.width, canvas.height);
         
        ctx.strokeStyle = "#638ec4";
        ctx.lineWidth = 15;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
    
        if (positions.length > 1) {
          ctx.beginPath();
          ctx.moveTo(positions[0].x, positions[0].y);
          for (let i = 1; i < positions.length; i++) {
            ctx.lineTo(positions[i].x, positions[i].y);
          }
          ctx.stroke();
        }
      }, [positions]);
    
  
    return <canvas ref={canvasRef} className={className} width={canvasSize.width} height={canvasSize.height} style={{ width: '100%', height: '100%' }}/>;
};

export default Canvas;

Canvas.propTypes = {
    className: PropTypes.string,
  };
  