import { useEffect } from 'react';
import { useBlot } from '../lib/useBlot';

function App() {
  const { getImageData, Editor } = useBlot();

  useEffect(() => {
    getImageData();
  }, [getImageData]);

  return (
    <div className="flex m1">
      <Editor width={200} height={200} />
    </div>
  );
}

export default App;
