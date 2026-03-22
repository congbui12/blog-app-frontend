import {
  // $createLinkNode,
  // $isAutoLinkNode,
  $isLinkNode,
  TOGGLE_LINK_COMMAND,
} from '@lexical/link';
import {
  $findMatchingParent,
  $getSelection,
  $isNodeSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_HIGH,
  COMMAND_PRIORITY_LOW,
  getDOMSelection,
  KEY_ESCAPE_COMMAND,
  mergeRegister,
  SELECTION_CHANGE_COMMAND,
  type BaseSelection,
  type LexicalEditor,
} from 'lexical';
import { useCallback, useEffect, useRef, useState, type Dispatch } from 'react';
import {
  getSelectedNode,
  sanitizeUrl,
  setFloatingElemPositionForLinkEditor,
} from '../../../../../utils/editor';
import { CheckIcon, PencilIcon, TrashIcon, XIcon } from 'lucide-react';

interface FloatingLinkEditorProps {
  editor: LexicalEditor;
  isLink: boolean;
  setIsLink: Dispatch<boolean>;
  anchorElem: HTMLElement;
  isLinkEditMode: boolean;
  setIsLinkEditMode: Dispatch<boolean>;
}

const FloatingLinkEditor = ({
  editor,
  isLink,
  setIsLink,
  anchorElem,
  isLinkEditMode,
  setIsLinkEditMode,
}: FloatingLinkEditorProps) => {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [linkUrl, setLinkUrl] = useState('');
  const [editedLinkUrl, setEditedLinkUrl] = useState('https://');
  const [lastSelection, setLastSelection] = useState<BaseSelection | null>(null);

  const $updateLinkEditor = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      const node = getSelectedNode(selection);
      const linkParent = $findMatchingParent(node, $isLinkNode);
      if (linkParent) {
        setLinkUrl(linkParent.getURL());
      } else if ($isLinkNode(node)) {
        setLinkUrl(node.getURL());
      } else {
        setLinkUrl('');
      }
    } else if ($isNodeSelection(selection)) {
      const nodes = selection.getNodes();
      if (nodes.length > 0) {
        const node = nodes[0];
        const parent = node.getParent();
        if ($isLinkNode(parent)) {
          setLinkUrl(parent.getURL());
        } else if ($isLinkNode(node)) {
          setLinkUrl(node.getURL());
        } else {
          setLinkUrl('');
        }
      }
    }
    if (isLinkEditMode) {
      setEditedLinkUrl(linkUrl);
    }
    const editorElem = editorRef.current;
    const nativeSelection = getDOMSelection(editor._window);
    const activeElement = document.activeElement;

    if (editorElem === null) return;

    const rootElement = editor.getRootElement();
    if (selection !== null && rootElement !== null && editor.isEditable()) {
      let domRect: DOMRect | undefined;
      if ($isNodeSelection(selection)) {
        const nodes = selection.getNodes();
        if (nodes.length > 0) {
          const element = editor.getElementByKey(nodes[0].getKey());
          if (element) {
            domRect = element.getBoundingClientRect();
          }
        }
      } else if (nativeSelection !== null && rootElement.contains(nativeSelection?.anchorNode)) {
        domRect = nativeSelection.focusNode?.parentElement?.getBoundingClientRect();
      }

      if (domRect) {
        domRect.y += 40;
        setFloatingElemPositionForLinkEditor(domRect, editorElem, anchorElem);
      }
      setLastSelection(selection);
    } else if (!activeElement || activeElement.className !== 'link-input') {
      if (rootElement !== null) {
        setFloatingElemPositionForLinkEditor(null, editorElem, anchorElem);
      }
      setLastSelection(null);
      setIsLinkEditMode(false);
      setLinkUrl('');
    }

    return true;
  }, [editor, anchorElem, isLinkEditMode, setIsLinkEditMode, linkUrl]);

  useEffect(() => {
    const scrollerElem = anchorElem.parentElement;

    const update = () => {
      editor.getEditorState().read(() => {
        $updateLinkEditor();
      });
    };

    window.addEventListener('resize', update);
    if (scrollerElem) {
      window.addEventListener('scroll', update);
    }

    return () => {
      window.removeEventListener('resize', update);
      if (scrollerElem) {
        window.removeEventListener('scroll', update);
      }
    };
  }, [editor, $updateLinkEditor, anchorElem.parentElement]);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          $updateLinkEditor();
        });
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        () => {
          $updateLinkEditor();
          return true;
        },
        COMMAND_PRIORITY_LOW
      ),
      editor.registerCommand(
        KEY_ESCAPE_COMMAND,
        () => {
          if (isLink) {
            setIsLink(false);
            return false;
          }
          return true;
        },
        COMMAND_PRIORITY_HIGH
      )
    );
  }, [editor, $updateLinkEditor, isLink, setIsLink]);

  useEffect(() => {
    editor.getEditorState().read(() => {
      $updateLinkEditor();
    });
  }, [editor, $updateLinkEditor]);

  useEffect(() => {
    if (isLinkEditMode && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isLinkEditMode, isLink]);

  useEffect(() => {
    const editorElement = editorRef.current;
    if (editorElement === null) {
      return;
    }
    const handleBlur = (event: FocusEvent) => {
      if (!editorElement.contains(event.relatedTarget as Element) && isLink) {
        setIsLink(false);
        setIsLinkEditMode(false);
      }
    };
    editorElement.addEventListener('focusout', handleBlur);
    return () => {
      editorElement.removeEventListener('focusout', handleBlur);
    };
  }, [editorRef, setIsLink, setIsLinkEditMode, isLink]);

  const handleLinkSubmission = (
    event: React.KeyboardEvent<HTMLInputElement> | React.MouseEvent<HTMLElement>
  ) => {
    event.preventDefault();
    if (lastSelection !== null) {
      if (linkUrl !== '') {
        editor.update(() => {
          editor.dispatchCommand(TOGGLE_LINK_COMMAND, sanitizeUrl(editedLinkUrl));
          // const selection = $getSelection();
          // if ($isRangeSelection(selection)) {
          //   const parent = getSelectedNode(selection).getParent();
          //   if ($isAutoLinkNode(parent)) {
          //     const linkNode = $createLinkNode(parent.getURL(), {
          //       rel: parent.__rel,
          //       target: parent.__target,
          //       title: parent.__title,
          //     });
          //     parent.replace(linkNode, true);
          //   }
          // }
        });
      }
      setEditedLinkUrl('https://');
      setIsLinkEditMode(false);
    }
  };

  const preventDefault = (
    event: React.KeyboardEvent<HTMLInputElement> | React.MouseEvent<HTMLElement>
  ): void => {
    event.preventDefault();
  };

  const monitorInputInteraction = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleLinkSubmission(event);
    } else if (event.key === 'Escape') {
      event.preventDefault();
      setIsLinkEditMode(false);
    }
  };

  return (
    <div
      ref={editorRef}
      className="absolute z-100 -top-2500 -left-2500 -mt-1.5 max-w-75 w-full opacity-0 bg-white shadow-[0px_5px_10px_rgba(0,0,0,0.3)] rounded-lg 
  transition-opacity duration-500"
    >
      {!isLink ? null : isLinkEditMode ? (
        <>
          <input
            ref={inputRef}
            className="block w-[calc(100%-24px)] box-border mx-3 my-2 p-[8px_12px] rounded-[15px] bg-[#eee] text-[15px] text-[rgb(5,5,5)] border-0 outline-0 relative font-inherit"
            value={editedLinkUrl}
            onChange={(event) => {
              setEditedLinkUrl(event.target.value);
            }}
            onKeyDown={(event) => {
              monitorInputInteraction(event);
            }}
          />
          <div>
            <div
              className="absolute right-0 top-0 bottom-0 w-8.75 bg-center bg-no-repeat align-[-0.25em] cursor-pointer"
              role="button"
              tabIndex={0}
              onMouseDown={preventDefault}
              onClick={() => {
                setIsLinkEditMode(false);
              }}
            >
              <XIcon className="w-4 h-4" />
            </div>

            <div
              className="absolute right-0 top-0 bottom-0 w-8.75 bg-center bg-no-repeat align-[-0.25em] cursor-pointer"
              role="button"
              tabIndex={0}
              onMouseDown={preventDefault}
              onClick={handleLinkSubmission}
            >
              <CheckIcon className="w-4 h-4" />
            </div>
          </div>
        </>
      ) : (
        <div className="block w-[calc(100%-24px)] box-border mx-3 my-2 p-[8px_12px] rounded-[15px] bg-[#eee] text-[15px] text-[rgb(5,5,5)] border-0 outline-0 relative font-inherit">
          <a href={sanitizeUrl(linkUrl)} target="_blank" rel="noopener noreferrer">
            {linkUrl}
          </a>
          <div
            className="absolute right-0 top-0 bottom-0 w-8.75 bg-center bg-no-repeat align-[-0.25em] cursor-pointer"
            role="button"
            tabIndex={0}
            onMouseDown={preventDefault}
            onClick={(event) => {
              event.preventDefault();
              setEditedLinkUrl(linkUrl);
              setIsLinkEditMode(true);
            }}
          >
            <PencilIcon className="w-4 h-4" />
          </div>
          <div
            className="absolute right-0 top-0 bottom-0 w-8.75 bg-center bg-no-repeat align-[-0.25em] cursor-pointer"
            role="button"
            tabIndex={0}
            onMouseDown={preventDefault}
            onClick={() => {
              editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
            }}
          >
            <TrashIcon className="w-4 h-4" />
          </div>
        </div>
      )}
    </div>
  );
};

export default FloatingLinkEditor;
