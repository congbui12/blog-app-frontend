import { MoveLeftIcon, MoveRightIcon } from 'lucide-react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';

interface PaginationArrowProps {
  href: string;
  direction: 'left' | 'right';
  isDisabled?: boolean;
}

const PaginationArrow = ({ href, direction, isDisabled }: PaginationArrowProps) => {
  const className = clsx('flex h-10 w-10 items-center justify-center rounded-md border', {
    'pointer-events-none text-gray-300': isDisabled,
    'hover:bg-gray-100': !isDisabled,
    'mr-2 md:mr-4': direction === 'left',
    'ml-2 md:ml-4': direction === 'right',
  });

  const icon =
    direction === 'left' ? <MoveLeftIcon className="w-4" /> : <MoveRightIcon className="w-4" />;

  return isDisabled ? (
    <div className={className}>{icon}</div>
  ) : (
    <Link className={className} to={href}>
      {icon}
    </Link>
  );
};

export default PaginationArrow;
