import type { SerializedLexicalNode, SerializedTextNode, SerializedElementNode } from 'lexical';

export const isSerializedTextNode = (node: SerializedLexicalNode): node is SerializedTextNode => {
  return node.type === 'text';
};

export const isSerializedElementNode = (
  node: SerializedLexicalNode
): node is SerializedElementNode => {
  return 'children' in node && Array.isArray((node as SerializedElementNode).children);
};

export const hasLexicalNode = (nodes: SerializedLexicalNode[] | undefined): boolean => {
  if (!nodes || !Array.isArray(nodes)) {
    return false;
  }
  return nodes.some((node) => {
    if (isSerializedTextNode(node)) {
      return node.text.trim().length > 0;
    }
    if (node.type === 'image' || node.type === 'horizontalrule') {
      return true;
    }
    if (isSerializedElementNode(node)) {
      return hasLexicalNode(node.children);
    }
    return false;
  });
};
