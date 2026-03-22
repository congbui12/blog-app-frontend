import * as React from 'react';
import * as Select from '@radix-ui/react-select';
import clsx from 'clsx';
import { CheckIcon } from 'lucide-react';

type SelectItemProps = React.ComponentPropsWithoutRef<typeof Select.Item>;

const SelectItem = React.forwardRef<React.ComponentRef<typeof Select.Item>, SelectItemProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <Select.Item
        className={clsx('relative flex items-center px-8 py-2', className)}
        {...props}
        ref={ref}
      >
        <Select.ItemText>{children}</Select.ItemText>
        <Select.ItemIndicator className="absolute left-2 inline-flex items-center justify-center">
          <CheckIcon className="w-4 h-4" />
        </Select.ItemIndicator>
      </Select.Item>
    );
  }
);

SelectItem.displayName = 'SelectItem';

export default SelectItem;
