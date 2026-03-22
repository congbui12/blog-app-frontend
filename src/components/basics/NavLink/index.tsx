import type { ComponentType, SVGProps } from 'react';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';

interface NavLinkProps {
  to: string;
  label: string;
  OutlineIcon: ComponentType<SVGProps<SVGSVGElement>>;
  SolidIcon: ComponentType<SVGProps<SVGSVGElement>>;
}

const NavLink = ({ to, label, OutlineIcon, SolidIcon }: NavLinkProps) => {
  const location = useLocation();
  const isActiveLink = location.pathname === to;
  const Icon = isActiveLink ? SolidIcon : OutlineIcon;

  return (
    <NavigationMenu.Item>
      <NavigationMenu.Link asChild active={isActiveLink}>
        <Link
          to={to}
          className={clsx(
            'flex items-center gap-2 px-3 py-2 text-sm font-medium transition-colors rounded-md',
            isActiveLink
              ? 'text-blue-600 bg-blue-50'
              : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'
          )}
        >
          <Icon className="w-5 h-5" />
          <span className="hidden lg:inline">{label}</span>
        </Link>
      </NavigationMenu.Link>
    </NavigationMenu.Item>
  );
};

export default NavLink;
