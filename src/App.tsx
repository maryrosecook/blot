import { useEffect } from 'react';
import { useBlot } from '../lib/useBlot';

function App() {
  const { getImageData, Editor } = useBlot();

  useEffect(() => {
    getImageData();
  }, [getImageData]);

  return (
    <div className="m1 p1 border border-gray rounded inline-block">
      <Editor width={200} height={200} />
    </div>
  );
}

export default App;
