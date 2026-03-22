import type { SerializedRootNode, SerializedParagraphNode, SerializedLexicalNode } from 'lexical';
import type { LexicalDocument } from '../../types';

export const createEmptyDocument = (): LexicalDocument => ({
  root: {
    type: 'root',
    version: 1,
    direction: null,
    format: '',
    indent: 0,
    children: [
      {
        type: 'paragraph',
        version: 1,
        children: [],
        direction: null,
        format: '',
        indent: 0,
        textFormat: 0,
        textStyle: '',
      } as SerializedParagraphNode,
    ] as SerializedLexicalNode[],
  },
});

export const isLexicalDocument = (val: unknown): val is LexicalDocument => {
  if (typeof val !== 'object' || val === null) {
    return false;
  }
  const root = (val as LexicalDocument).root;
  return (
    typeof root === 'object' &&
    root !== null &&
    Array.isArray((root as SerializedRootNode).children)
  );
};
