import { useCallback, useEffect, useState } from 'react';
import './styles.css';
import { assertTruthy } from './assert';

const PENCIL_RADIUS = 3;
const ERASER_SIZE = 9;

export function Canvas({
  width,
  height,
  currentTool,
  currentColor,
  canvasRef,
}: {
  width: number;
  height: number;
  currentTool: string;
  currentColor: string;
  canvasRef: React.RefObject<HTMLCanvasElement>;
}) {
  const [isDrawing, setIsDrawing] = useState(false);

  const setupCanvas = useCallback(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const contextElement = canvas.getContext('2d');
    assertTruthy(contextElement);

    const pixelRatio = window.devicePixelRatio;
    canvas.width = canvas.offsetWidth * pixelRatio;
    canvas.height = canvas.offsetHeight * pixelRatio;

    contextElement.scale(pixelRatio, pixelRatio);
    contextElement.imageSmoothingEnabled = false;
  }, [canvasRef]);

  useEffect(() => setupCanvas, [setupCanvas]);

  const getAdjustedCoordinatesForPixelRatioAndCanvasOffset = (
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    const canvas = canvasRef.current;
    assertTruthy(canvas);

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    return { x, y };
  };

  const makeToolMark = useCallback(
    (coordinates: { x: number; y: number }) => {
      const canvas = canvasRef.current;
      const context = canvas?.getContext('2d');

      if (!context) {
        return;
      }

      context.beginPath();
      context.fillStyle = currentColor;

      if (currentTool === 'eraser') {
        context.clearRect(
          coordinates.x,
          coordinates.y,
          ERASER_SIZE,
          ERASER_SIZE
        );
      } else {
        context.arc(
          coordinates.x,
          coordinates.y,
          PENCIL_RADIUS,
          0,
          Math.PI * 2,
          true
        );
        context.fill();
      }
      context.closePath();
    },
    [canvasRef, currentColor, currentTool]
  );

  const onStartDrawing = (
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');

    if (!context) {
      return;
    }

    const coordinates =
      getAdjustedCoordinatesForPixelRatioAndCanvasOffset(event);

    makeToolMark(coordinates);
    setIsDrawing(true);
  };

  const onDrawMove = (
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');

    if (!isDrawing) {
      return;
    }

    assertTruthy(context);

    const coordinates =
      getAdjustedCoordinatesForPixelRatioAndCanvasOffset(event);

    makeToolMark(coordinates);
  };

  const onStopDrawing = () => {
    setIsDrawing(false);
  };

  return (
    <canvas
      ref={canvasRef}
      style={{ width, height }}
      onMouseDown={onStartDrawing}
      onMouseUp={onStopDrawing}
      onMouseMove={onDrawMove}
    />
  );
}
