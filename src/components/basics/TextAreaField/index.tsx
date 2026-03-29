import { TextArea, Text, Box, Flex } from '@radix-ui/themes';
import { useController, type UseControllerProps, type FieldValues } from 'react-hook-form';

interface TextAreaFieldProps<T extends FieldValues> extends UseControllerProps<T> {
  label?: string;
  placeholder?: string;
  rows?: number;
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
  className?: string;
}

const TextAreaField = <T extends FieldValues>(props: TextAreaFieldProps<T>) => {
  const { field, fieldState } = useController<T>(props);

  return (
    <Box width="100%" className={props.className}>
      <Flex direction="column" gap="2">
        {props.label && (
          <Text as="label" htmlFor={props.name} size="2" weight="bold" mt="1">
            {props.label}
          </Text>
        )}

        <TextArea
          {...field}
          id={props.name}
          placeholder={props.placeholder}
          size="3"
          rows={props.rows || 4}
          resize={props.resize || 'vertical'}
          color={fieldState.error ? 'red' : undefined}
          variant="soft"
        />

        {fieldState.error && (
          <Text as="p" id={`${props.name}-error`} color="red" size="1" mt="1">
            {fieldState.error.message}
          </Text>
        )}
      </Flex>
    </Box>
  );
};

export default TextAreaField;
