import { generatePagination } from '../../../utils/helper';
import { useLocation, useSearchParams } from 'react-router-dom';
import PaginationArrow from './PaginationArrow';
import PaginationNumber from './PaginationNumber';

const Pagination = ({ totalPages }: { totalPages: number }) => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  const allPages = generatePagination(currentPage, totalPages);

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${location.pathname}?${params.toString()}`;
  };
  return (
    <>
      <div className="inline-flex">
        <PaginationArrow
          href={createPageURL(currentPage - 1)}
          direction="left"
          isDisabled={currentPage <= 1}
        />

        <div className="flex -space-x-px">
          {allPages.map((page, index) => {
            let position: 'first' | 'last' | 'single' | 'middle' | undefined;
            if (index === 0) position = 'first';
            if (index === allPages.length - 1) position = 'last';
            if (allPages.length === 1) position = 'single';
            if (page === '...') position = 'middle';

            return (
              <PaginationNumber
                key={`${page}-${index}`}
                page={page}
                href={createPageURL(page)}
                isActive={currentPage === page}
                position={position}
              />
            );
          })}
        </div>

        <PaginationArrow
          href={createPageURL(currentPage + 1)}
          direction="right"
          isDisabled={currentPage >= totalPages}
        />
      </div>
    </>
  );
};

export default Pagination;
