import pencil from '../public/assets/pencil.png';
import eraser from '../public/assets/eraser.png';
import classNames from 'classnames';

enum Tools {
  PENCIL = 'pencil',
  ERASER = 'eraser',
}

export function Toolbar({
  currentTool,
  setCurrentTool,
}: {
  currentTool: string;
  setCurrentTool: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <div className="flex flex-column p1" style={{ width: 35, height: 100 }}>
      <div className=""></div>

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
            src={tool === Tools.PENCIL ? pencil : eraser}
            alt={tool}
            style={{ width: 25, height: 25 }}
          />
        </div>
      ))}
    </div>
  );
}