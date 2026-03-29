import type { ComponentType, SVGProps } from 'react';
import { useController, type UseControllerProps, type FieldValues } from 'react-hook-form';
import { Box, Flex, Text, TextField } from '@radix-ui/themes';

type RadixInputType = React.ComponentPropsWithoutRef<typeof TextField.Root>['type'];

interface AppTextFieldProps<T extends FieldValues> extends UseControllerProps<T> {
  label?: string;
  icon?: ComponentType<SVGProps<SVGSVGElement>>;
  placeholder?: string;
  type?: RadixInputType;
  className?: string;
}
const AppTextField = <T extends FieldValues>(props: AppTextFieldProps<T>) => {
  const { field, fieldState } = useController<T>(props);
  const Icon = props.icon;

  return (
    <Box className={props.className} width="100%">
      <Flex direction="column" gap="2">
        {props.label && (
          <Text as="label" htmlFor={props.name} size="2" weight="bold" mt="1">
            {props.label}
          </Text>
        )}
        <TextField.Root
          {...field}
          id={props.name}
          type={props.type || 'text'}
          placeholder={props.placeholder}
          size="3"
          radius="large"
          color={fieldState.error ? 'red' : undefined}
          variant="surface"
        >
          {Icon && (
            <TextField.Slot>
              <Icon width="16" height="16" />
            </TextField.Slot>
          )}
        </TextField.Root>

        {fieldState.error && (
          <Text as="p" id={`${props.name}-error`} color="red" size="1" mt="1">
            {fieldState.error.message}
          </Text>
        )}
      </Flex>
    </Box>
  );
};

export default AppTextField;
