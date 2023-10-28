import { useCallback, useRef } from 'react';
import { Editor } from './Editor';

export function useEditor({
  width,
  height,
}: {
  width: number;
  height: number;
}) {
  const editorRef = useRef<{ getImageData: () => void }>(null);

  const getImageData = useCallback(() => {
    if (editorRef.current) {
      editorRef.current.getImageData();
    }
  }, []);

  const EditorComponent = (
    <Editor width={width} height={height} ref={editorRef} />
  );

  return { getImageData, EditorComponent };
}
