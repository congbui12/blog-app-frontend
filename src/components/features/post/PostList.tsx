import type { PostItem } from '../../../types';
import PostCard from './PostCard';
import Pagination from '../paginition/Pagination';
import { Flex, Text, Container } from '@radix-ui/themes';

interface PostListProps {
  posts: PostItem[];
  totalPages: number;
}

const PostList = ({ posts, totalPages }: PostListProps) => {
  if (!posts.length) {
    return (
      <Flex
        align="center"
        justify="center"
        p="9"
        gap="1"
        className="border-2 border-dashed border-gray-300 rounded-xl bg-gray-50"
      >
        <Text as="p" color="gray" size="4" weight="medium" className="italic">
          No posts available.
        </Text>
        <Text as="p" color="gray" size="2">
          Check back later for new content.
        </Text>
      </Flex>
    );
  }
  return (
    <Container size="2">
      <Flex direction="column" gap="6" py="4">
        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
        {totalPages > 1 && (
          <Flex justify="center" align="center">
            <Pagination totalPages={totalPages} />
          </Flex>
        )}
      </Flex>
    </Container>
  );
};

export default PostList;
