import type { Control, FieldValues, Path } from 'react-hook-form';
import InputField from '../../basics/InputField';
import Button from '../../basics/Button';
import clsx from 'clsx';

interface CommentFormProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  onCancel?: () => void;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void> | void;
  isDisabled: boolean;
  isPending: boolean;
  placeholder?: string;
  buttonText: string;
}

const CommentForm = <T extends FieldValues>({
  control,
  name,
  onCancel,
  onSubmit,
  isDisabled,
  isPending,
  placeholder,
  buttonText,
}: CommentFormProps<T>) => {
  return (
    <form onSubmit={onSubmit} className="flex flex-row gap-2 items-start">
      <InputField control={control} name={name} placeholder={placeholder} />
      <div className="flex gap-2">
        {onCancel && (
          <Button
            type="button"
            onClick={onCancel}
            className="px-3 py-1 bg-gray-600 text-white font-bold rounded-xl hover:bg-gray-700 shadow-lg shadow-blue-200 disabled:opacity-70 transition"
          >
            Cancel
          </Button>
        )}
        <Button
          disabled={isDisabled}
          type="submit"
          className={clsx(
            'px-3 py-1 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-200 disabled:opacity-70 transition',
            isDisabled && 'cursor-not-allowed'
          )}
        >
          {isPending ? 'Submitting...' : buttonText}
        </Button>
      </div>
    </form>
  );
};

export default CommentForm;
