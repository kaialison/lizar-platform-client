import { Input, InputProps } from "@nextui-org/react";
import { SearchIcon } from "lucide-react";

interface CustomSearchProps extends Omit<InputProps, 'startContent'> {
  onSearch?: (value: string) => void;
}

export const CustomSearch = ({ onSearch, ...props }: CustomSearchProps) => {
  return (
    <Input
      startContent={<SearchIcon size={18} />}
      onChange={(e) => onSearch?.(e.target.value)}
      {...props}
    />
  );
};