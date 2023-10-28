import { useEffect } from 'react';
import { useEditor } from './useEditor';

export function Blot() {
  const { getImageData, EditorComponent } = useEditor();

  useEffect(() => {
    getImageData();
  }, [getImageData]);

  return EditorComponent;
}
