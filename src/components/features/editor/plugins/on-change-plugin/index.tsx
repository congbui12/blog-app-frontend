import { OnChangePlugin as LexicalOnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import type { LexicalDocument } from '../../../../../types';
import type { EditorState } from 'lexical';

interface OnChangePluginProps {
  onChange: (value: LexicalDocument) => void;
}

const OnChangePlugin = ({ onChange }: OnChangePluginProps) => {
  const handleChange = (editorState: EditorState) => {
    editorState.read(() => {
      const json = editorState.toJSON();
      onChange(json as LexicalDocument);
    });
  };

  return <LexicalOnChangePlugin onChange={handleChange} />;
};

export default OnChangePlugin;
