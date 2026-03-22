import SelectMenu from '../../basics/SelectMenu';

const COMMENT_SORT_OPTIONS = [
  { value: 'desc', label: 'Newest' },
  { value: 'asc', label: 'Oldest' },
] as const;

interface CommentSortMenuProps {
  sort: 'asc' | 'desc';
  onSortChange: (newSort: 'asc' | 'desc') => void;
}

const CommentSortMenu = ({ sort, onSortChange }: CommentSortMenuProps) => {
  return (
    <SelectMenu
      placeholder="Sort by"
      options={COMMENT_SORT_OPTIONS}
      currentValue={sort}
      onChange={(val) => onSortChange(val as 'asc' | 'desc')}
      className="mb-4"
    />
  );
};

export default CommentSortMenu;
