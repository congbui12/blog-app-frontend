import { Flex, Spinner, Text } from '@radix-ui/themes';

interface AppSpinnerProps {
  label?: string;
  size?: '1' | '2' | '3';
}

const AppSpinner = ({ label = 'Loading...', size = '3' }: AppSpinnerProps) => {
  return (
    <Flex align="center" justify="center" gap="3" p="4">
      <Spinner size={size} />
      {label && (
        <Text color="gray" size="2">
          {label}
        </Text>
      )}
    </Flex>
  );
};

export default AppSpinner;
