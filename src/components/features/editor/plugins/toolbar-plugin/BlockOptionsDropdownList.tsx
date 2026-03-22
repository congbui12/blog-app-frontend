import SelectMenu from '../../../../basics/SelectMenu';
import {
  $getSelection,
  $isRangeSelection,
  $createParagraphNode,
  type LexicalEditor,
} from 'lexical';
import { $setBlocksType } from '@lexical/selection';
import { $createCodeNode } from '@lexical/code';
import { $createHeadingNode, $createQuoteNode, type HeadingTagType } from '@lexical/rich-text';
import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  REMOVE_LIST_COMMAND,
} from '@lexical/list';
import { type BlockType, BLOCK_OPTIONS } from '../../config';

interface BlockOptionsDropdownListProps {
  editor: LexicalEditor;
  blockType: BlockType;
  toolbarRef: React.RefObject<HTMLDivElement | null>;
}

const BlockOptionsDropdownList = ({
  editor,
  blockType,
  toolbarRef,
}: BlockOptionsDropdownListProps) => {
  const handleBlockChange = (newValue: BlockType): void => {
    // Optimization: don't update if already selected (except for lists which toggle)
    if (blockType === newValue && newValue !== 'ul' && newValue !== 'ol') return;

    if (newValue === 'ul') {
      editor.dispatchCommand(
        blockType !== 'ul' ? INSERT_UNORDERED_LIST_COMMAND : REMOVE_LIST_COMMAND,
        undefined
      );
      return;
    }

    if (newValue === 'ol') {
      editor.dispatchCommand(
        blockType !== 'ol' ? INSERT_ORDERED_LIST_COMMAND : REMOVE_LIST_COMMAND,
        undefined
      );
      return;
    }

    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        switch (newValue) {
          case 'paragraph':
            $setBlocksType(selection, () => $createParagraphNode());
            break;
          case 'h1':
          case 'h2':
            $setBlocksType(selection, () => $createHeadingNode(newValue as HeadingTagType));
            break;
          case 'quote':
            $setBlocksType(selection, () => $createQuoteNode());
            break;
          case 'code':
            $setBlocksType(selection, () => $createCodeNode());
            break;
        }
      }
    });
  };
  return (
    <div ref={toolbarRef} className="">
      <SelectMenu<BlockType>
        options={BLOCK_OPTIONS}
        currentValue={blockType}
        onChange={handleBlockChange}
      />
    </div>
  );
};

export default BlockOptionsDropdownList;
