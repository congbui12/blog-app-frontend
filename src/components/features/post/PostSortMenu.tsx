import { useSearchParams } from 'react-router-dom';
import SelectMenu from '../../basics/SelectMenu';

const POST_SORT_OPTIONS = [
  { value: 'newest', label: 'Newest' },
  { value: 'oldest', label: 'Oldest' },
  { value: 'most-liked', label: 'Most liked' },
] as const;

const PostSortMenu = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentSort = searchParams.get('sortedBy') || 'newest';

  const handleSortChange = (sort: string) => {
    const params = new URLSearchParams();
    params.set('sortedBy', sort);
    params.set('page', '1');
    setSearchParams(params);
  };
  return (
    <SelectMenu
      placeholder="Sort"
      options={POST_SORT_OPTIONS}
      currentValue={currentSort}
      onChange={handleSortChange}
    />
  );
};

export default PostSortMenu;
