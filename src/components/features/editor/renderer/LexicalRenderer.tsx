import type { LexicalDocument } from '../../../../types';
import EditorWrapper from '../editor-wrapper';

interface LexicalRendererProps {
  content: LexicalDocument;
}

const LexicalRenderer = ({ content }: LexicalRendererProps) => {
  return <EditorWrapper value={content} editable={false} />;
};

export default LexicalRenderer;
