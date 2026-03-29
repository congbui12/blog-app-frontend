import { Select } from '@radix-ui/themes';

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
      <Select.Trigger className={props.className} placeholder={props.placeholder} />
      <Select.Content position="popper" sideOffset={5}>
        <Select.Group>
          {props.label && <Select.Label>{props.label}</Select.Label>}
          {props.options.map((opt) => (
            <Select.Item key={opt.value} value={opt.value}>
              {opt.label}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default SelectMenu;
