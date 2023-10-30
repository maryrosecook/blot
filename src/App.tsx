import { Button } from 'evergreen-ui';
import { useBlot } from '../lib/useBlot';

const COLORS = [
  '#000000',
  '#FFFFFF',
  '#796DCB',
  '#6DA0CB',
  '#5BB69F',
  '#99BF6B',
  '#A76AB9',
  '#BB67A2',
  '#C55D83',
  '#D35E4C',
  '#E18C43',
  '#E1B040',
];

function App() {
  const { getImageData, Editor } = useBlot({ colors: COLORS });

  return (
    <div className="flex flex-column m1">
      <Editor width={200} height={200} />

      <div>
        <Button
          className="mt1"
          onClick={() => {
            console.log(getImageData());
          }}
        >
          Log image data
        </Button>
      </div>
    </div>
  );
}

export default App;
