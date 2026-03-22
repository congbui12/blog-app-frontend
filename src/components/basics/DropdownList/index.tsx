import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import clsx from 'clsx';

interface DropdownListProps extends React.ComponentPropsWithoutRef<typeof DropdownMenu.Root> {
  trigger: React.ReactNode;
  contentProps?: React.ComponentPropsWithoutRef<typeof DropdownMenu.Content>;
}

const DropdownList = ({ trigger, children, contentProps, ...rootProps }: DropdownListProps) => {
  return (
    <DropdownMenu.Root {...rootProps}>
      <DropdownMenu.Trigger asChild>{trigger}</DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="start"
          sideOffset={8}
          {...contentProps}
          className={clsx(
            'mt-2 min-w-32 rounded-md border bg-white shadow-md',
            contentProps?.className
          )}
        >
          {children}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default DropdownList;
