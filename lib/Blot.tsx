import { useEffect } from 'react';
import { useEditor } from './useEditor';

export function Blot() {
  const { getImageData, EditorComponent } = useEditor({
    width: 200,
    height: 200,
  });

  useEffect(() => {
    getImageData();
  }, [getImageData]);

  return EditorComponent;
}
