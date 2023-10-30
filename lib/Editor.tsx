import {
  ForwardedRef,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import './styles.css';
import { Toolbar } from './Toolbar';
import { Canvas } from './Canvas';
import { assertTruthy } from './assert';

export const Editor = forwardRef(
  (
    {
      width,
      height,
      colors,
    }: { width: number; height: number; colors: Array<string> },
    ref: ForwardedRef<{ getImageData: () => void }>
  ) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [currentTool, setCurrentTool] = useState('pencil');
    const [currentColor, setCurrentColor] = useState(colors[0]);

    const getImageData = useCallback(() => {
      const canvas = canvasRef.current;
      const context = canvas?.getContext('2d');
      assertTruthy(canvas && context);

      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);

      return imageData;
    }, []);

    useImperativeHandle(ref, () => ({
      getImageData,
    }));

    return (
      <div className="flex width-full height-full">
        <div className="border-gray border-bottom border-left border-right border-top rounded-top-left rounded-bottom-left rounded-bottom-right">
          <Canvas
            width={width}
            height={height}
            currentTool={currentTool}
            currentColor={currentColor}
            canvasRef={canvasRef}
          />
        </div>

        <div className="height-full">
          <div
            className="border-gray border-top border-right border-bottom border-left rounded-top-right rounded-bottom-right rounded-bottom-left"
            // Make Toolbar left border overlap Canvas right border
            style={{ marginLeft: -1 }}
          >
            <Toolbar
              currentTool={currentTool}
              setCurrentTool={setCurrentTool}
              colors={colors}
              currentColor={currentColor}
              setCurrentColor={setCurrentColor}
            />
          </div>
        </div>
      </div>
    );
  }
);
