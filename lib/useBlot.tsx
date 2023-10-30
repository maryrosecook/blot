import { useCallback, useRef } from 'react';
import { Editor } from './Editor';
import { assertTruthy } from './assert';

export function useBlot({ colors }: { colors: Array<string> }) {
  const editorRef = useRef<{ getImageData: () => void }>(null);

  const getImageData = useCallback(() => {
    const editor = editorRef.current;
    assertTruthy(editor);

    return editor.getImageData();
  }, []);

  return {
    getImageData,
    Editor: ({ width, height }: { width: number; height: number }) => (
      <Editor width={width} height={height} colors={colors} ref={editorRef} />
    ),
  };
}
