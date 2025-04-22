import { Select, SelectItem, DateRangePicker } from "@nextui-org/react";
import { Calendar } from "lucide-react";
import { DateValue } from "@internationalized/date";
import { RangeValue } from "@react-types/shared";

interface FilterOption {
  key: string;
  label: string;
}

interface CustomFilterProps {
  type?: "date" | "select";
  label: string;
  placeholder?: string;
  options?: FilterOption[];
  value?: string;
  onChange?: (selectedKey: string) => void;
  // Add date filter props
  dateValue?: RangeValue<DateValue>;
  onDateChange?: (value: RangeValue<DateValue> | null) => void;
  // Add filter handler
  onFilter?: (type: string, value: string | { start: Date; end: Date } | null) => void;
}

export const CustomFilter = ({
  type = "select",
  label,
  placeholder,
  options,
  value, // For Select
  onChange, // For Select
  dateValue, // For DateRangePicker
  onDateChange, // For DateRangePicker
  onFilter // Add filter handler
}: CustomFilterProps) => {
  // Common base styles
  const commonBaseStyles = "w-full";

  // Specific styles for DatePicker input
  const datePickerInputWrapperStyles = "h-12 pl-10 border border-[#D0D5DD] bg-white rounded-lg";
  // Specific styles for Select trigger (no left padding for icon)
  const selectTriggerStyles = "h-12 border border-[#D0D5DD] bg-white rounded-lg text-[#344054]";


  if (type === "date") {
    return (
      <div className={commonBaseStyles}>
        <label className="block text-sm font-medium text-[#344054] mb-1.5">
          {label}
        </label>
        <div className="relative">
          {/* Icon only for DatePicker */}
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#344054] z-10 pointer-events-none">
            <Calendar size={20} />
          </div>
          <DateRangePicker
            aria-label={label}
            placeholder={placeholder}
            value={dateValue}
            onChange={(value) => {
              onDateChange?.(value);
              if (value?.start && value?.end) {
                const startDate = new Date((value.start as DateValue).toString());
                const endDate = new Date((value.end as DateValue).toString());
                
                onFilter?.('date', {
                  start: startDate,
                  end: endDate
                });
              }
            }}
            classNames={{
              base: commonBaseStyles,
              inputWrapper: `${datePickerInputWrapperStyles} cursor-pointer relative`, // Add relative positioning
              popoverContent: "rounded-lg shadow-lg",
              calendar: "gap-1",
              selectorIcon: "hidden",
              selectorButton: "w-full h-full absolute inset-0" // Changed from trigger to selectorButton
            }}
          />
        </div>
      </div>
    );
  }

  // --- Select Type ---
  return (
    <div className={commonBaseStyles}>
      <label className="block text-sm font-medium text-[#344054] mb-1.5">
        {label}
      </label>
      <Select
        aria-label={label}
        placeholder={placeholder}
        className={commonBaseStyles} 
        classNames={{
          trigger: selectTriggerStyles, 
          listbox: "rounded-lg shadow-lg",
          value: "text-[#344054]", 
        }}
        selectedKeys={value ? [value] : []} 
        onChange={(e) => onChange?.(e.target.value)} 
      >
        {(options ?? []).map((option) => (
          <SelectItem key={option.key} value={option.key}>
            {option.label}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
};
