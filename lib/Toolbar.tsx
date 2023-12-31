import classNames from 'classnames';
import { Popover } from 'evergreen-ui';

enum Tools {
  PENCIL = 'pencil',
  ERASER = 'eraser',
}

export function Toolbar({
  currentTool,
  setCurrentTool,
  colors,
  currentColor,
  setCurrentColor,
}: {
  currentTool: string;
  setCurrentTool: React.Dispatch<React.SetStateAction<string>>;
  colors: Array<string>;
  currentColor: string;
  setCurrentColor: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <div className="flex flex-column p1" style={{ width: 35 }}>
      {Object.values(Tools).map((tool, index) => (
        <div
          key={tool}
          className={classNames(
            'flex justify-between items-center p-half rounded border border-box',
            index !== 0 ? 'mt1' : '',
            currentTool === tool
              ? 'gray-light1 border-black'
              : 'border-gray pointer'
          )}
          onClick={() => setCurrentTool(tool)}
        >
          <img
            src={getToolImage(tool)}
            alt={tool}
            style={{ width: 25, height: 25 }}
          />
        </div>
      ))}

      {currentTool !== Tools.ERASER ? (
        <Popover
          position="bottom-left"
          minWidth={180}
          content={({ close }) => (
            <Colors
              colors={colors}
              currentColor={currentColor}
              setCurrentColor={setCurrentColor}
              close={close}
            />
          )}
        >
          {/* Div required to allow Evergreen to pass a ref */}
          <div>
            <ColorButton color={currentColor} isEnabled={true} />
          </div>
        </Popover>
      ) : (
        <ColorButton color={currentColor} isEnabled={false} />
      )}
    </div>
  );
}

function Colors({
  colors,
  currentColor,
  setCurrentColor,
  close,
}: {
  colors: Array<string>;
  currentColor: string;
  setCurrentColor: React.Dispatch<React.SetStateAction<string>>;
  close: () => void;
}) {
  return (
    <div className="flex flex-wrap p1" style={{ width: 180 }}>
      {colors.map((color) => (
        <div
          key={color}
          className={classNames(
            'flex justify-between items-center p-half m-half rounded border border-box',
            currentColor === color
              ? 'gray-light1 border-black'
              : 'border-gray pointer'
          )}
          onClick={() => {
            setCurrentColor(color);
            close();
          }}
        >
          <div
            className="rounded pointer border-box"
            style={{
              width: 25,
              height: 25,
              backgroundColor: color,
              border: color === '#FFFFFF' ? '1px solid black' : '',
            }}
          />
        </div>
      ))}
    </div>
  );
}

function ColorButton({
  color,
  isEnabled,
}: {
  color: string;
  isEnabled: boolean;
}) {
  return (
    <div
      className={classNames(
        'flex justify-between items-center p-half rounded border border-box mt1 border-gray',
        { pointer: isEnabled }
      )}
      style={{
        opacity: isEnabled ? 1 : 0.5,
      }}
    >
      <div
        className={classNames('rounded', { border: color === '#FFFFFF' })}
        style={{
          width: 25,
          height: 25,
          backgroundColor: color,
        }}
      />
    </div>
  );
}

function getToolImage(tool: string) {
  switch (tool) {
    case Tools.PENCIL:
      return '/assets/pencil.png';
    case Tools.ERASER:
      return '/assets/eraser.png';
    default:
      throw new Error('Invalid tool');
  }
}
