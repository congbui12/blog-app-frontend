import { useSearchParams } from 'react-router-dom';
import SelectMenu from '../../basics/SelectMenu';

const POST_STATUS_OPTIONS = [
  { value: 'all', label: 'All posts' },
  { value: 'published', label: 'Published' },
  { value: 'draft', label: 'Draft' },
] as const;

const PostStatusFilterMenu = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentStatus = searchParams.get('status') || undefined;

  const handleStatusChange = (status: string) => {
    const params = new URLSearchParams();
    if (status === 'all') {
      params.delete('status');
    } else {
      params.set('status', status);
    }
    params.set('page', '1');
    setSearchParams(params);
  };
  return (
    <SelectMenu
      placeholder="Status"
      label="None"
      options={POST_STATUS_OPTIONS}
      currentValue={currentStatus || ''}
      onChange={handleStatusChange}
    />
  );
};

export default PostStatusFilterMenu;
