import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import reactLogo from '../../../assets/react.svg';
import { useAuth, useLogout } from '../../../hooks';
import Button from '../../basics/Button';
import AppAlertDialog from '../../basics/AppAlertDialog';
import SearchBar from '../../features/search/SearchBar';
import NavLink from '../../basics/NavLink';
import NavMenu from '../../basics/NavMenu';
import {
  MagnifyingGlassIcon,
  HomeIcon as HomeOutline,
  Squares2X2Icon as DashboardOutline,
  PencilSquareIcon as WriteOutline,
  UserCircleIcon,
  ArrowRightStartOnRectangleIcon,
  ArrowRightEndOnRectangleIcon,
} from '@heroicons/react/24/outline';
import {
  HomeIcon as HomeSolid,
  Squares2X2Icon as DashboardSolid,
  PencilSquareIcon as WriteSolid,
} from '@heroicons/react/24/solid';

const publicNav = [
  {
    to: '/',
    label: 'Home',
    OutlineIcon: HomeOutline,
    SolidIcon: HomeSolid,
  },
];

const privateNav = [
  {
    to: '/dashboard',
    label: 'Dashboard',
    OutlineIcon: DashboardOutline,
    SolidIcon: DashboardSolid,
  },
  {
    to: '/posts/new',
    label: 'Write',
    OutlineIcon: WriteOutline,
    SolidIcon: WriteSolid,
  },
];

const Header = () => {
  const { user } = useAuth();
  const { mutate } = useLogout();
  const navigate = useNavigate();
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState<boolean>(false);

  const handleSearch = (term: string) => {
    navigate(`/posts/search?term=${encodeURIComponent(term)}`);
    setIsMobileSearchOpen(false);
  };

  const handleLogout = () => {
    mutate(undefined, { onSuccess: () => navigate('/login', { replace: true }) });
  };

  return (
    <>
      <header className="flex items-center gap-4 px-4 py-2 shadow-md sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b">
        <Link to="/" className="shrink-0">
          <img
            src={reactLogo}
            alt="logo"
            className="
          animate-logo-in
          w-8 h-8
          transition-transform duration-200 ease-out
          hover:rotate-12 hover:scale-110
          active:scale-95
        "
          />
        </Link>
        <div className="flex-1 max-w-md hidden md:block">
          <SearchBar placeholder="Search posts..." onSearch={handleSearch} />
        </div>

        <div className="md:hidden flex-1 flex justify-end">
          <Button
            onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
            className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Toggle search"
          >
            <MagnifyingGlassIcon className="w-6 h-6" />
          </Button>
        </div>

        <NavigationMenu.Root className="relative z-10 flex flex-1 justify-end">
          <NavigationMenu.List className="flex items-center gap-1 list-none">
            {/* Public Links */}
            {publicNav.map((item) => (
              <NavLink key={item.to} {...item} />
            ))}

            {/* Private Links */}
            {user && privateNav.map((item) => <NavLink key={item.to} {...item} />)}

            {user ? (
              <NavMenu
                trigger={
                  <div className="flex items-center gap-1 text-blue-500 font-medium">
                    <UserCircleIcon className="w-5 h-5" />
                    <span className="max-w-25 truncate">{user.username}</span>
                  </div>
                }
              >
                <div className="p-2 w-48 flex flex-col gap-1">
                  <Link
                    to="/profile"
                    className="flex items-center gap-2 p-2 text-sm text-slate-700 hover:bg-slate-100 rounded-md"
                  >
                    <UserCircleIcon className="w-4 h-4" /> Account
                  </Link>
                  <button
                    onClick={() => setIsConfirmOpen(true)}
                    className="flex items-center gap-2 p-2 text-sm text-red-500 hover:bg-red-50 rounded-md w-full text-left font-medium"
                  >
                    <ArrowRightStartOnRectangleIcon className="w-4 h-4" /> Logout
                  </button>
                </div>
              </NavMenu>
            ) : (
              <NavigationMenu.Item>
                <NavigationMenu.Link asChild>
                  <Link
                    to="/login"
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-medium hover:bg-blue-700 transition-colors"
                  >
                    <ArrowRightEndOnRectangleIcon className="w-4 h-4" /> Login
                  </Link>
                </NavigationMenu.Link>
              </NavigationMenu.Item>
            )}
          </NavigationMenu.List>
        </NavigationMenu.Root>

        {isMobileSearchOpen && (
          <div className="absolute top-full left-0 w-full p-4 bg-white border-b shadow-lg md:hidden animate-in slide-in-from-top-2">
            <SearchBar
              placeholder="Search posts..."
              onSearch={handleSearch}
              autoFocus // Helps user start typing immediately
            />
          </div>
        )}
      </header>
      <AppAlertDialog
        open={isConfirmOpen}
        onOpenChange={setIsConfirmOpen}
        title="Sign out"
        description="Are you sure you want to log out?"
        onAction={handleLogout}
      />
    </>
  );
};

export default Header;
