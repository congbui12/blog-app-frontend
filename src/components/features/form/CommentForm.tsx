import type { Control, FieldValues, Path } from 'react-hook-form';
import TextAreaField from '../../basics/TextAreaField';
import { Flex, Button } from '@radix-ui/themes';

interface CommentFormProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  onCancel?: () => void;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void> | void;
  isDisabled: boolean;
  isPending: boolean;
  placeholder?: string;
  buttonText: string;
}

const CommentForm = <T extends FieldValues>({
  control,
  name,
  onCancel,
  onSubmit,
  isDisabled,
  isPending,
  placeholder,
  buttonText,
}: CommentFormProps<T>) => {
  return (
    <form onSubmit={onSubmit} className="w-full md:w-3/4 mx-auto">
      <Flex direction="column" gap="3">
        <TextAreaField
          control={control}
          name={name}
          placeholder={placeholder}
          resize="vertical"
          rows={3}
        />
      </Flex>

      <Flex gap="3" justify="end" mt="2">
        {onCancel && (
          <Button
            type="button"
            variant="soft"
            color="gray"
            size="2"
            onClick={onCancel}
            className="cursor-pointer font-bold rounded-xl transition-all"
          >
            Cancel
          </Button>
        )}
        <Button
          type="submit"
          size="2"
          variant="solid"
          highContrast
          loading={isPending}
          disabled={isDisabled}
          className="cursor-pointer font-bold rounded-xl shadow-md disabled:opacity-70 disabled:cursor-not-allowed transition-all"
        >
          {buttonText}
        </Button>
      </Flex>
    </form>
  );
};

export default CommentForm;
