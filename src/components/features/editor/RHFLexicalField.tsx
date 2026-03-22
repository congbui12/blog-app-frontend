import { useController, type UseControllerProps, type FieldValues } from 'react-hook-form';
import type { LexicalDocument } from '../../../types';
import EditorWrapper from './editor-wrapper';

interface RHFLexicalFieldProps<T extends FieldValues> extends UseControllerProps<T> {
  label?: string;
}

const RHFLexicalField = <T extends FieldValues>(props: RHFLexicalFieldProps<T>) => {
  const { field, fieldState } = useController<T>(props);
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {props.label && (
        <label htmlFor={props.name} className="text-sm font-medium text-gray-700 ml-1">
          {props.label}
        </label>
      )}
      <EditorWrapper value={field.value as LexicalDocument} onChange={field.onChange} editable />
      {fieldState.error && <p className="text-xs text-red-600 ml-1">{fieldState.error.message}</p>}
    </div>
  );
};

export default RHFLexicalField;
