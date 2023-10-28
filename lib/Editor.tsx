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

export const Editor = forwardRef(
  (
    { width, height }: { width: number; height: number },
    ref: ForwardedRef<{ getImageData: () => void }>
  ) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isDrawing, setIsDrawing] = useState(false);

    const getImageData = useCallback(() => {
      console.log('hi');
    }, []);

    useImperativeHandle(ref, () => ({
      getImageData,
    }));

    const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);
    const [context, setContext] = useState<CanvasRenderingContext2D | null>(
      null
    );

    useEffect(() => {
      const canvasElement: HTMLCanvasElement | null = canvasRef.current;

      if (!canvasElement) {
        return;
      }

      const contextElement = canvasElement.getContext('2d');

      if (!contextElement) {
        return;
      }

      const pixelRatio = window.devicePixelRatio;
      canvasElement.width = canvasElement.offsetWidth * pixelRatio;
      canvasElement.height = canvasElement.offsetHeight * pixelRatio;

      contextElement.scale(pixelRatio, pixelRatio);
      contextElement.imageSmoothingEnabled = false;
      setCanvas(canvasElement);
      setContext(contextElement);
    }, []);

    const getAdjustedCoordinatesForPixelRatioAndCanvasOffset = (
      event: React.MouseEvent<HTMLCanvasElement, MouseEvent>
    ) => {
      if (!canvas) {
        return;
      }

      const rect = canvas.getBoundingClientRect();
      const pixelRatio = window.devicePixelRatio;
      const x = (event.clientX - rect.left) / pixelRatio;
      const y = (event.clientY - rect.top) / pixelRatio;

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
        width={width}
        height={height}
        onMouseDown={onStartDrawing}
        onMouseUp={onStopDrawing}
        onMouseMove={onDrawMove}
      />
    );
  }
);
