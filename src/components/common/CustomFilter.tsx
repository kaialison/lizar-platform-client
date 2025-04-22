import { Select, SelectItem } from "@nextui-org/react";

interface FilterOption {
  key: string;
  label: string;
}

interface CustomFilterProps {
  label: string;
  placeholder: string;
  options: FilterOption[];
  value?: string;
  onChange?: (value: string) => void;
}

export const CustomFilter = ({
  label,
  placeholder,
  options,
  value,
  onChange
}: CustomFilterProps) => {
  return (
    <Select
      label={label}
      placeholder={placeholder}
      className="max-w-xs"
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
    >
      {options.map((option) => (
        <SelectItem key={option.key} value={option.key}>
          {option.label}
        </SelectItem>
      ))}
    </Select>
  );
};