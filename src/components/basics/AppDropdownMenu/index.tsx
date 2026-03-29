import { DropdownMenu } from '@radix-ui/themes';

interface AppDropdownMenuProps extends React.ComponentPropsWithoutRef<typeof DropdownMenu.Root> {
  trigger: React.ReactNode;
  contentProps?: React.ComponentPropsWithoutRef<typeof DropdownMenu.Content>;
}

const AppDropdownMenu = ({
  trigger,
  children,
  contentProps,
  ...rootProps
}: AppDropdownMenuProps) => {
  return (
    <DropdownMenu.Root {...rootProps}>
      <DropdownMenu.Trigger>{trigger}</DropdownMenu.Trigger>
      <DropdownMenu.Content align="start" sideOffset={8} variant="soft" {...contentProps}>
        {children}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default AppDropdownMenu;
