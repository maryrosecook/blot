import { useCallback, useEffect, useState } from 'react';
import './styles.css';
import { assertTruthy } from './assert';

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
  const canvas = canvasRef.current;
  const context = canvas?.getContext('2d');

  const setupCanvas = useCallback(() => {
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
  }, [canvas]);

  useEffect(() => {
    setupCanvas();
  }, [setupCanvas]);

  const getAdjustedCoordinatesForPixelRatioAndCanvasOffset = (
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    if (!canvas) {
      return;
    }

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    return { x, y };
  };

  const PENCIL_RADIUS = 3;
  const ERASER_SIZE = 9;

  const makeToolMark = useCallback(
    (coordinates: { x: number; y: number }) => {
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
    [context, currentColor, currentTool]
  );

  const onStartDrawing = (
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    if (!context) {
      return;
    }

    const coordinates =
      getAdjustedCoordinatesForPixelRatioAndCanvasOffset(event);

    if (!coordinates) {
      return;
    }

    makeToolMark(coordinates);
    setIsDrawing(true);
  };

  const onDrawMove = (
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    if (!isDrawing || !context) {
      return;
    }

    const coordinates =
      getAdjustedCoordinatesForPixelRatioAndCanvasOffset(event);

    if (!coordinates) {
      return;
    }

    makeToolMark(coordinates);
  };

  const onStopDrawing = () => {
    if (!context) {
      return;
    }

    setIsDrawing(false);
    context.globalCompositeOperation = 'source-over';
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
