import { DropdownMenu } from '@radix-ui/themes';
import { forwardRef } from 'react';

type DropdownItemProps = React.ComponentPropsWithoutRef<typeof DropdownMenu.Item>;

const DropdownItem = forwardRef<React.ComponentRef<typeof DropdownMenu.Item>, DropdownItemProps>(
  ({ children, ...props }, ref) => {
    return (
      <DropdownMenu.Item ref={ref} {...props}>
        {children}
      </DropdownMenu.Item>
    );
  }
);

DropdownItem.displayName = 'DropdownItem';

export default DropdownItem;
