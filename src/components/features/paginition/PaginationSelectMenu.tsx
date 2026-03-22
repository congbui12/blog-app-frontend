import { useSearchParams } from 'react-router-dom';
import SelectMenu from '../../basics/SelectMenu';

const PAGE_LIMIT_OPTIONS = [
  { value: '5', label: '5 items' },
  { value: '10', label: '10 items' },
  { value: '15', label: '15 items' },
];

const PaginationSelectMenu = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentLimit = searchParams.get('limit') || '5';

  const handleLimitChange = (limit: string) => {
    const params = new URLSearchParams();
    params.set('limit', limit.toString());
    params.set('page', '1');
    setSearchParams(params);
  };
  return (
    <SelectMenu
      placeholder="Show"
      options={PAGE_LIMIT_OPTIONS}
      currentValue={currentLimit}
      onChange={handleLimitChange}
    />
  );
};

export default PaginationSelectMenu;
