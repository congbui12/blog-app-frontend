import type { ComponentType, SVGProps } from 'react';
import { useController, type UseControllerProps, type FieldValues } from 'react-hook-form';
import clsx from 'clsx';

interface InputFieldProps<T extends FieldValues> extends UseControllerProps<T> {
  label?: string;
  icon?: ComponentType<SVGProps<SVGSVGElement>>;
  placeholder?: string;
  type?: string;
  className?: string;
}
const InputField = <T extends FieldValues>(props: InputFieldProps<T>) => {
  const { field, fieldState } = useController<T>(props);
  const Icon = props.icon;

  return (
    <div className={clsx('flex flex-col gap-1.5 w-full', props.className)}>
      {props.label && (
        <label htmlFor={props.name} className="text-sm font-medium text-gray-700 ml-1">
          {props.label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Icon className="w-5 h-5" />
          </div>
        )}
        <input
          {...field}
          id={props.name}
          type={props.type || 'text'}
          placeholder={props.placeholder}
          className={clsx(
            'block w-full rounded-2xl border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset transition-all outline-none',
            Icon ? 'pl-10' : 'pl-4',
            'pr-4 placeholder:text-gray-400 focus:ring-2 focus:ring-inset',
            fieldState.error
              ? 'ring-red-300 focus:ring-red-500 text-red-900'
              : 'ring-gray-300 focus:ring-blue-600'
          )}
        />
      </div>

      {fieldState.error && (
        <p id={`${props.name}-error`} className="mt-1 text-xs text-red-600 ml-1">
          {fieldState.error.message}
        </p>
      )}
    </div>
  );
};

export default InputField;
