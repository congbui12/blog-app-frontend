import { Dialog, Flex, Spinner, Text } from '@radix-ui/themes';

interface PageLoaderProps {
  isOpen: boolean;
}

const PageLoader = ({ isOpen }: PageLoaderProps) => {
  if (!isOpen) {
    return null;
  }
  return (
    <Dialog.Root open={isOpen}>
      <Dialog.Content
        size="2"
        style={{
          maxWidth: 'fit-content',
          borderRadius: 'var(--radius-4)',
        }}
      >
        <Flex direction="column" align="center" justify="center" gap="3">
          <Spinner size="3" />
          <Text size="2" color="gray" weight="medium">
            Loading...
          </Text>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default PageLoader;
