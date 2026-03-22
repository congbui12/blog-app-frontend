import SelectMenu from '../../basics/SelectMenu';

const STATUS_OPTIONS = [
  { value: 'draft', label: 'Draft' },
  { value: 'published', label: 'Published' },
] as const;

interface CommentSortMenuProps {
  status: 'draft' | 'published';
  onStatusChange: (newStatus: 'draft' | 'published') => void;
}

const PostStatusSelector = ({ status, onStatusChange }: CommentSortMenuProps) => {
  return (
    <SelectMenu
      placeholder="Status"
      options={STATUS_OPTIONS}
      currentValue={status}
      onChange={(val) => onStatusChange(val as 'draft' | 'published')}
      className="mb-4"
    />
  );
};

export default PostStatusSelector;
