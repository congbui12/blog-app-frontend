import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import HistoryPlugin from '../plugins/history-plugin';
import OnChangePlugin from '../plugins/on-change-plugin';
import EditorToolbar from '../plugins/toolbar-plugin';
import type { LexicalDocument } from '../../../../types';
import TreeViewPlugin from '../plugins/tree-view-plugin';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import CodeHighlightPlugin from '../plugins/code-highlight-plugin';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import AutoLinkPlugin from '../plugins/auto-link-plugin';
import ListMaxIndentLevelPlugin from '../plugins/list-max-indent-level-plugin';
import { lexicalEditorConfig } from '../config';

interface EditorWrapperProps {
  value?: LexicalDocument;
  onChange?: (value: LexicalDocument) => void;
  editable?: boolean;
}

const EditorWrapper = ({ onChange, editable = true }: EditorWrapperProps) => {
  return (
    <LexicalComposer initialConfig={lexicalEditorConfig}>
      {editable && <EditorToolbar />}
      <div className="relative">
        <RichTextPlugin
          contentEditable={
            <ContentEditable className="min-h-37.5 p-3 outline-none border rounded" />
          }
          placeholder={
            <div className="absolute top-3 left-3 pointer-events-none text-gray-400">
              Write your post...
            </div>
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
      </div>

      <HistoryPlugin />
      <TreeViewPlugin />
      <AutoFocusPlugin />
      <CodeHighlightPlugin />
      <ListPlugin />
      <LinkPlugin />
      <AutoLinkPlugin />
      <ListMaxIndentLevelPlugin maxDepth={7} />
      {onChange && <OnChangePlugin onChange={onChange} />}
    </LexicalComposer>
  );
};

export default EditorWrapper;
