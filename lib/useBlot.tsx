import { useCallback, useRef } from 'react';
import { Editor } from './Editor';

export function useBlot({ colors }: { colors: Array<string> }) {
  const editorRef = useRef<{ getImageData: () => void }>(null);

  const getImageData = useCallback(() => {
    if (editorRef.current) {
      editorRef.current.getImageData();
    }
  }, []);

  return {
    getImageData,
    Editor: ({ width, height }: { width: number; height: number }) => (
      <Editor width={width} height={height} colors={colors} ref={editorRef} />
    ),
  };
}
