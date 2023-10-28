import { useCallback, useRef } from 'react';
import { Editor } from './Editor';

export function useEditor() {
  const editorRef = useRef<{ getImageData: () => void }>(null);

  const getImageData = useCallback(() => {
    if (editorRef.current) {
      editorRef.current.getImageData();
    }
  }, []);

  const EditorComponent = <Editor width={200} height={200} ref={editorRef} />;

  return { getImageData, EditorComponent };
}
