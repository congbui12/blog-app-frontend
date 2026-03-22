import * as Select from '@radix-ui/react-select';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import clsx from 'clsx';
import SelectItem from '../SelectItem';

interface Option<T> {
  label: string;
  value: T;
}

interface SelectMenuProps<T> {
  placeholder?: string;
  label?: string;
  options: readonly Option<T>[];
  currentValue: T;
  onChange: (value: T) => void;
  className?: string;
}

const SelectMenu = <T extends string>(props: SelectMenuProps<T>) => {
  return (
    <Select.Root value={props.currentValue} onValueChange={props.onChange}>
      <Select.Trigger className={clsx('flex items-center justify-between', props.className)}>
        <Select.Value placeholder={props.placeholder || undefined} />
        <Select.Icon>
          <ChevronDownIcon className="w-4 h-4" />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content position="popper" sideOffset={5}>
          <Select.ScrollUpButton>
            <ChevronUpIcon className="w-4 h-4" />
          </Select.ScrollUpButton>

          <Select.Viewport className="p-1">
            <Select.Group>
              {props.label && (
                <Select.Label className="px-3 py-2 text-xs font-bold text-gray-500">
                  {props.label}
                </Select.Label>
              )}
              {props.options.map((opt) => (
                <SelectItem
                  key={opt.value}
                  value={opt.value}
                  className={clsx(
                    'flex items-center justify-between w-full px-3 py-2 text-sm rounded-md cursor-pointer outline-none',
                    opt.value === props.currentValue
                      ? 'bg-blue-50 text-blue-700 font-semibold'
                      : 'text-gray-700 hover:bg-gray-100'
                  )}
                >
                  {opt.label}
                </SelectItem>
              ))}
            </Select.Group>
          </Select.Viewport>

          <Select.ScrollDownButton>
            <ChevronDownIcon className="w-4 h-4" />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};

export default SelectMenu;
