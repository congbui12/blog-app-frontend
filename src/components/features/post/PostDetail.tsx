import { LexicalComposer } from '@lexical/react/LexicalComposer';
import type { PostData } from '../../../types';
import * as helper from '../../../utils/helper';
import PostActions from './PostActions';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { ListItemNode, ListNode } from '@lexical/list';

const PostDetail = ({ post }: { post: PostData }) => {
  const postedOn = helper.formatDate(post.createdAt, 'MMMM dd, yyyy');
  console.log(postedOn);
  const isPostEdited = helper.isEdited(post.createdAt, post.updatedAt);

  return (
    <div className="relative w-full">
      <div className="mx-auto max-w-5xl px-4">
        <div className="grid grid-cols-1 lg:grid-cols-[64px_1fr] gap-8">
          {/* Sidebar */}
          <aside className="hidden lg:block">
            <PostActions post={post} />
          </aside>

          {/* Article */}
          <article className="max-w-3xl">
            <h1 className="text-3xl font-bold leading-tight wrap-break-word">{post.title}</h1>

            <p className="mt-2 font-semibold">{post.author.username}</p>

            <p className="text-sm text-gray-500">
              Posted on {postedOn}
              {isPostEdited && <span className="ml-2 italic text-gray-400">(Edited)</span>}
            </p>

            <div className="prose prose-lg max-w-none mt-8 wrap-break-word">
              {/* <LexicalContentRenderer content={post.content} /> */}
              <LexicalComposer
                initialConfig={{
                  namespace: 'PostContentRenderer',
                  onError: (error) => console.error(error),
                  editable: false,
                  editorState: JSON.stringify(post.content),
                  nodes: [HeadingNode, QuoteNode, ListNode, ListItemNode],
                }}
              >
                <RichTextPlugin
                  contentEditable={<ContentEditable />}
                  placeholder={null}
                  ErrorBoundary={LexicalErrorBoundary}
                />
              </LexicalComposer>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
