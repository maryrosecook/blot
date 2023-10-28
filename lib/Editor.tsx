import {
  ForwardedRef,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import './styles.css';
import { assertTruthy } from './assert';

export const Editor = forwardRef(
  (
    { width, height }: { width: number; height: number },
    ref: ForwardedRef<{ getImageData: () => void }>
  ) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);
    const [context, setContext] = useState<CanvasRenderingContext2D | null>(
      null
    );

    const getImageData = useCallback(() => {
      if (!canvasRef.current || !context) {
        return null;
      }

      const imageData = context.getImageData(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );

      return imageData;
    }, [context]);

    useImperativeHandle(ref, () => ({
      getImageData,
    }));

    useEffect(() => {
      const canvasElement: HTMLCanvasElement | null = canvasRef.current;

      if (!canvasElement) {
        return;
      }

      const contextElement = canvasElement.getContext('2d');
      assertTruthy(contextElement);

      const pixelRatio = window.devicePixelRatio;
      canvasElement.width = canvasElement.offsetWidth * pixelRatio;
      canvasElement.height = canvasElement.offsetHeight * pixelRatio;

      contextElement.scale(pixelRatio, pixelRatio);
      contextElement.imageSmoothingEnabled = false;
      setCanvas(canvasElement);
      setContext(contextElement);
    }, [canvasRef]);

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

    const onDrawMove = (
      event: React.MouseEvent<HTMLCanvasElement, MouseEvent>
    ) => {
      if (!isDrawing || !context) {
        return;
      }

      const coords = getAdjustedCoordinatesForPixelRatioAndCanvasOffset(event);

      if (!coords) {
        return;
      }

      context.lineTo(coords.x, coords.y);
      context.stroke();
      context.beginPath();
      context.moveTo(coords.x, coords.y);
    };

    const onStartDrawing = (
      event: React.MouseEvent<HTMLCanvasElement, MouseEvent>
    ) => {
      if (!context) {
        return;
      }

      const coords = getAdjustedCoordinatesForPixelRatioAndCanvasOffset(event);

      if (!coords) {
        return;
      }

      context.beginPath();
      context.moveTo(coords.x, coords.y);
      setIsDrawing(true);
    };

    const onStopDrawing = () => {
      if (!context) {
        return;
      }

      context.beginPath();
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
);
