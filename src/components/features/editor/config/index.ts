import { lexicalEditorTheme } from '../theme';
import { AutoLinkNode, LinkNode } from '@lexical/link';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { CodeHighlightNode, CodeNode } from '@lexical/code';
import { TableNode, TableCellNode, TableRowNode } from '@lexical/table';
import { ListNode, ListItemNode } from '@lexical/list';

export const lexicalEditorConfig = {
  namespace: 'PostEditor',
  theme: lexicalEditorTheme,
  onError: (error: Error) => {
    console.error(error);
  },
  nodes: [
    HeadingNode,
    ListNode,
    ListItemNode,
    QuoteNode,
    CodeNode,
    CodeHighlightNode,
    TableNode,
    TableCellNode,
    TableRowNode,
    AutoLinkNode,
    LinkNode,
  ],
};

export const BLOCK_OPTIONS = [
  { label: 'Normal', value: 'paragraph' },
  { label: 'Large Heading', value: 'h1' },
  { label: 'Small Heading', value: 'h2' },
  { label: 'Bullet List', value: 'ul' },
  { label: 'Numbered List', value: 'ol' },
  { label: 'Quote', value: 'quote' },
  { label: 'Code Block', value: 'code' },
] as const;

export type BlockType = typeof BLOCK_OPTIONS[number]['value'];

export const SUPPORTED_BLOCK_TYPES = new Set<BlockType>(
  BLOCK_OPTIONS.map((opt) => opt.value)
);

export const BLOCK_TYPE_TO_BLOCK_NAME: Record<BlockType, string> = Object.fromEntries(
  BLOCK_OPTIONS.map((opt) => [opt.value, opt.label])
) as Record<BlockType, string>;


