import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  REDO_COMMAND,
  UNDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  FORMAT_TEXT_COMMAND,
  FORMAT_ELEMENT_COMMAND,
  $getSelection,
  $isRangeSelection,
  $getNodeByKey,
  type NodeKey,
  $isTextNode,
  $createParagraphNode,
} from 'lexical';
import { $isLinkNode, TOGGLE_LINK_COMMAND } from '@lexical/link';
// import { $isParentElementRTL } from '@lexical/selection';
import { $getNearestNodeOfType, mergeRegister } from '@lexical/utils';
import { $isListNode, ListNode } from '@lexical/list';
import { createPortal } from 'react-dom';
import { $isHeadingNode } from '@lexical/rich-text';
import { $isCodeNode, getDefaultCodeLanguage, getCodeLanguages } from '@lexical/code';
import {
  Undo2,
  Redo2,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Code,
  ChevronDown,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  // Image as ImageIcon,
  Link as LinkIcon,
  Eraser,
} from 'lucide-react';
import { type BlockType, SUPPORTED_BLOCK_TYPES } from '../../config';
import { getSelectedNode } from '../../../../../utils/editor';
import Divider from './Divider';
import BlockOptionsDropdownList from './BlockOptionsDropdownList';
import SelectMenu from '../../../../basics/SelectMenu';
// import FloatingLinkEditor from './FloatingLinkEditor';
import { $setBlocksType } from '@lexical/selection';
import FloatingLinkEditorPlugin from '../../hooks/useFloatingLinkEditor';

const LowPriority = 1;

const ToolbarPlugin = () => {
  const [editor] = useLexicalComposerContext();
  const toolbarRef = useRef<HTMLDivElement | null>(null);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [blockType, setBlockType] = useState<BlockType>('paragraph');
  const [selectedElementKey, setSelectedElementKey] = useState<NodeKey | null>(null);
  const [codeLanguage, setCodeLanguage] = useState('');
  // const [isRTL, setIsRTL] = useState(false);
  const [isLink, setIsLink] = useState(false);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);
  const [isCode, setIsCode] = useState(false);
  const [isLinkEditMode, setIsLinkEditMode] = useState<boolean>(false);

  const updateToolbar = useCallback(() => {
    editor.getEditorState().read(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        const anchorNode = selection.anchor.getNode();
        const element =
          anchorNode.getKey() === 'root' ? anchorNode : anchorNode.getTopLevelElementOrThrow();

        const elementKey = element.getKey();
        const elementDOM = editor.getElementByKey(elementKey);

        if (elementDOM !== null) {
          setSelectedElementKey(elementKey);
          if ($isListNode(element)) {
            const parentList = $getNearestNodeOfType(anchorNode, ListNode);
            const type = parentList ? parentList.getTag() : element.getTag();
            setBlockType(type);
          } else {
            const type = $isHeadingNode(element) ? element.getTag() : element.getType();
            if (SUPPORTED_BLOCK_TYPES.has(type as BlockType)) {
              setBlockType(type as BlockType);
            }
            if ($isCodeNode(element)) {
              setCodeLanguage(element.getLanguage() || getDefaultCodeLanguage());
            }
          }
        }
        setIsBold(selection.hasFormat('bold'));
        setIsItalic(selection.hasFormat('italic'));
        setIsUnderline(selection.hasFormat('underline'));
        setIsStrikethrough(selection.hasFormat('strikethrough'));
        setIsCode(selection.hasFormat('code'));
        // setIsRTL($isParentElementRTL(selection));

        const node = getSelectedNode(selection);
        const parent = node.getParent();
        setIsLink($isLinkNode(parent) || $isLinkNode(node));
      }
    });
  }, [editor]);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(() => {
        updateToolbar();
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        () => {
          updateToolbar();
          return false;
        },
        LowPriority
      ),
      editor.registerCommand(
        CAN_UNDO_COMMAND,
        (payload: boolean) => {
          setCanUndo(payload);
          return false;
        },
        LowPriority
      ),
      editor.registerCommand(
        CAN_REDO_COMMAND,
        (payload: boolean) => {
          setCanRedo(payload);
          return false;
        },
        LowPriority
      )
    );
  }, [editor, updateToolbar]);

  const codeLanguges = useMemo(() => {
    const languages = getCodeLanguages();
    return languages.map((lang) => ({
      value: lang,
      label: lang.charAt(0).toUpperCase() + lang.slice(1), // Capitalize for the UI
    }));
  }, []);
  const onCodeLanguageSelect = useCallback(
    (value: string) => {
      editor.update(() => {
        if (selectedElementKey !== null) {
          const node = $getNodeByKey(selectedElementKey);
          if ($isCodeNode(node)) {
            node.setLanguage(value);
          }
        }
      });
    },
    [editor, selectedElementKey]
  );

  const insertLink = useCallback(() => {
    if (!isLink) {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, 'https://');
    } else {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
    }
  }, [editor, isLink]);

  const clearFormatting = useCallback(() => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        // 1. Clear inline formatting (Bold, Italic, etc.)
        selection.getNodes().forEach((node) => {
          if ($isTextNode(node)) {
            node.setFormat(0);
            node.setStyle('');
          }
          // 2. If it's a link, unwrap it
          if ($isLinkNode(node)) {
            const children = node.getChildren();
            for (const child of children) {
              node.insertBefore(child);
            }
            node.remove();
          }
        });

        // 3. Reset block type to paragraph
        $setBlocksType(selection, () => $createParagraphNode());
      }
    });
  }, [editor]);

  return (
    <div
      className="flex items-center gap-1 p-1 bg-white border-b border-gray-200 sticky top-0 z-10 overflow-x-auto no-scrollbar"
      ref={toolbarRef}
    >
      <div className="flex items-center">
        {/* UNDO/REDO */}
        <button
          type="button"
          disabled={!canUndo}
          onClick={() => editor.dispatchCommand(UNDO_COMMAND, undefined)}
          className={`
      p-2 rounded-md transition-colors duration-100
      flex items-center justify-center
    `}
          aria-label="Undo"
          onMouseDown={(e: React.MouseEvent<HTMLButtonElement>) => e.preventDefault()}
        >
          <Undo2 size={18} />
        </button>
        <button
          type="button"
          disabled={!canRedo}
          onClick={() => editor.dispatchCommand(REDO_COMMAND, undefined)}
          className="toolbar-item"
          aria-label="Redo"
          onMouseDown={(e: React.MouseEvent<HTMLButtonElement>) => e.preventDefault()}
        >
          <Redo2 size={18} />
        </button>

        <Divider />

        {/* BLOCK TYPE SELECTOR */}
        {SUPPORTED_BLOCK_TYPES.has(blockType) && (
          <>
            <div onMouseDown={(e: React.MouseEvent<HTMLDivElement>) => e.preventDefault()}>
              <BlockOptionsDropdownList
                editor={editor}
                blockType={blockType}
                toolbarRef={toolbarRef}
              />
            </div>

            <Divider />
          </>
        )}

        {/* CODE LANGUAGE SELECT (Visible only when in a code block) */}
        {blockType === 'code' ? (
          <>
            <SelectMenu
              options={codeLanguges}
              currentValue={codeLanguage}
              onChange={onCodeLanguageSelect}
            />
            <ChevronDown size={16} className="inside" />
          </>
        ) : (
          <>
            {/* TEXT FORMATTING */}
            <button
              type="button"
              onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold')}
              className={'toolbar-item spaced ' + (isBold ? 'active' : '')}
              aria-label="Format Bold"
              onMouseDown={(e: React.MouseEvent<HTMLButtonElement>) => e.preventDefault()}
            >
              <Bold size={18} />
            </button>
            <button
              type="button"
              onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic')}
              className={'toolbar-item spaced ' + (isItalic ? 'active' : '')}
              aria-label="Format Italics"
              onMouseDown={(e: React.MouseEvent<HTMLButtonElement>) => e.preventDefault()}
            >
              <Italic size={18} />
            </button>
            <button
              type="button"
              onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline')}
              className={'toolbar-item spaced ' + (isUnderline ? 'active' : '')}
              aria-label="Format Underline"
              onMouseDown={(e: React.MouseEvent<HTMLButtonElement>) => e.preventDefault()}
            >
              <Underline size={18} />
            </button>
            <Divider />
            <button
              type="button"
              onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough')}
              className={'toolbar-item spaced ' + (isStrikethrough ? 'active' : '')}
              aria-label="Format Strikethrough"
              onMouseDown={(e: React.MouseEvent<HTMLButtonElement>) => e.preventDefault()}
            >
              <Strikethrough size={18} />
            </button>
            <Divider />

            <button
              type="button"
              onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'code')}
              className={'toolbar-item spaced ' + (isCode ? 'active' : '')}
              aria-label="Insert Code"
              onMouseDown={(e: React.MouseEvent<HTMLButtonElement>) => e.preventDefault()}
            >
              <Code size={18} />
            </button>
            <Divider />

            <button
              type="button"
              onClick={insertLink}
              className={'toolbar-item spaced ' + (isLink ? 'active' : '')}
              aria-label="Insert Link"
              onMouseDown={(e: React.MouseEvent<HTMLButtonElement>) => e.preventDefault()}
            >
              <LinkIcon size={18} />
            </button>
            <Divider />

            {/* IMAGE DIALOG (Pass the icon or use it inside the component) */}

            {isLink &&
              createPortal(
                <FloatingLinkEditorPlugin
                  // editor={editor}
                  isLinkEditMode={isLinkEditMode}
                  setIsLinkEditMode={setIsLinkEditMode}
                />,
                document.body
              )}
            <Divider />

            {/* ALIGNMENT */}
            <button
              type="button"
              onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'left')}
              className="toolbar-item spaced"
              aria-label="Left Align"
              onMouseDown={(e: React.MouseEvent<HTMLButtonElement>) => e.preventDefault()}
            >
              <AlignLeft size={18} />
            </button>
            <Divider />

            <button
              type="button"
              onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'center')}
              className="toolbar-item spaced"
              aria-label="Center Align"
              onMouseDown={(e: React.MouseEvent<HTMLButtonElement>) => e.preventDefault()}
            >
              <AlignCenter size={18} />
            </button>
            <Divider />

            <button
              type="button"
              onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'right')}
              className="toolbar-item spaced"
              aria-label="Right Align"
              onMouseDown={(e: React.MouseEvent<HTMLButtonElement>) => e.preventDefault()}
            >
              <AlignRight size={18} />
            </button>
            <Divider />

            <button
              type="button"
              onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'justify')}
              className="toolbar-item"
              aria-label="Justify Align"
              onMouseDown={(e: React.MouseEvent<HTMLButtonElement>) => e.preventDefault()}
            >
              <AlignJustify size={18} />
            </button>
            <Divider />
            <button
              type="button"
              onClick={clearFormatting}
              className="toolbar-item spaced"
              aria-label="Clear Formatting"
              onMouseDown={(e) => e.preventDefault()}
            >
              <Eraser size={18} />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ToolbarPlugin;
