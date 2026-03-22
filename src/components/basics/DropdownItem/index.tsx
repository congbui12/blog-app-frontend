import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { forwardRef } from 'react';
import clsx from 'clsx';

type DropdownItemProps = React.ComponentPropsWithoutRef<typeof DropdownMenu.Item>;

const DropdownItem = forwardRef<React.ComponentRef<typeof DropdownMenu.Item>, DropdownItemProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <DropdownMenu.Item ref={ref} className={clsx(className)} {...props}>
        {children}
      </DropdownMenu.Item>
    );
  }
);

DropdownItem.displayName = 'DropdownItem';

export default DropdownItem;
