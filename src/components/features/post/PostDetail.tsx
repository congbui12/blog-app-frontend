import { LexicalComposer } from '@lexical/react/LexicalComposer';
import type { PostData } from '../../../types';
import * as helper from '../../../utils/helper';
import PostActions from './PostActions';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { ListItemNode, ListNode } from '@lexical/list';
import { HorizontalRuleNode } from '@lexical/react/LexicalHorizontalRuleNode';
import { POST_STATUSES } from '../../../constants';
import { GlobeAltIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import { Container, Grid, Box, Flex, Heading, Text, Section } from '@radix-ui/themes';

const PostDetail = ({ post }: { post: PostData }) => {
  const postedOn = helper.formatDate(post.createdAt, 'MMMM dd, yyyy');

  return (
    // Section giúp tạo khoảng cách padding trên dưới (vertical padding) chuẩn hệ thống
    <Section size="2" p="0">
      <Container size="3" px="4">
        {/* Grid chia cột: 64px cho sidebar (chỉ hiện trên lg), 1fr cho nội dung chính */}
        <Grid columns={{ initial: '1', lg: '64px 1fr' }} gap="8">
          {/* Sidebar - Sử dụng asChild hoặc hiển thị có điều kiện */}
          <Box display={{ initial: 'none', lg: 'block' }}>
            <PostActions post={post} />
          </Box>

          {/* Article Content */}
          <Box maxWidth="768px">
            {' '}
            <article>
              <Flex direction="column" gap="2" mb="6">
                <Heading size="8" as="h1" highContrast className="wrap-break-word">
                  {post.title}
                </Heading>

                <Flex direction="column" gap="1">
                  <Text weight="bold" size="3">
                    {post.author.username}
                  </Text>

                  <Flex align="center" gap="2">
                    <Text size="2" color="gray">
                      Posted on {postedOn}
                    </Text>
                    <Box>
                      {post.status === POST_STATUSES.PUBLISHED ? (
                        <GlobeAltIcon className="w-4 h-4 opacity-70" />
                      ) : (
                        <LockClosedIcon className="w-4 h-4 opacity-70" />
                      )}
                    </Box>
                  </Flex>
                </Flex>
              </Flex>

              {/* Lexical Editor Content */}
              <Box className="prose prose-lg max-w-none wrap-break-word">
                <LexicalComposer
                  initialConfig={{
                    namespace: 'PostContentRenderer',
                    onError: (error) => console.error(error),
                    editable: false,
                    editorState: JSON.stringify(post.content),
                    nodes: [HeadingNode, QuoteNode, ListNode, ListItemNode, HorizontalRuleNode],
                  }}
                >
                  <RichTextPlugin
                    contentEditable={<ContentEditable />}
                    placeholder={null}
                    ErrorBoundary={LexicalErrorBoundary}
                  />
                </LexicalComposer>
              </Box>
            </article>
          </Box>
        </Grid>
      </Container>
    </Section>
  );
};

export default PostDetail;
