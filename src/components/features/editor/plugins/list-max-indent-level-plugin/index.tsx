import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { INDENT_CONTENT_COMMAND, COMMAND_PRIORITY_HIGH } from 'lexical';
import { useEffect } from 'react';
import { isIndentPermitted } from '../../../../../utils/editor';

interface ListMaxIndentLevelPluginProps {
  maxDepth?: number;
}

const ListMaxIndentLevelPlugin = ({ maxDepth }: ListMaxIndentLevelPluginProps) => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return editor.registerCommand(
      INDENT_CONTENT_COMMAND,
      () => !isIndentPermitted(maxDepth ?? 7),
      COMMAND_PRIORITY_HIGH
    );
  }, [editor, maxDepth]);

  return null;
};

export default ListMaxIndentLevelPlugin;
