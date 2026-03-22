import { ChevronDownIcon } from 'lucide-react';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';

interface NavMenuProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
}

const NavMenu = ({ trigger, children }: NavMenuProps) => (
  <NavigationMenu.Item>
    <NavigationMenu.Trigger className="group flex items-center gap-1 px-3 py-2 text-sm font-medium text-slate-700 hover:text-blue-600">
      {trigger}
      <ChevronDownIcon
        className="w-4 h-4 transition-transform duration-200 group-data-[state=open]:rotate-180"
        aria-hidden="true"
      />
    </NavigationMenu.Trigger>
    <NavigationMenu.Content className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-slate-200 z-50">
      {children}
    </NavigationMenu.Content>
  </NavigationMenu.Item>
);

export default NavMenu;
