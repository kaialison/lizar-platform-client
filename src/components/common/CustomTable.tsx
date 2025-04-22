import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  TableProps,
  SortDescriptor
} from "@nextui-org/react";
import { ReactNode } from "react";
import { TableColumnData } from "@/types/keyword";

interface CustomTableProps<T> {
  columns: TableColumnData[];
  data: T[];
  renderCell: (item: T, columnKey: string) => ReactNode;
  sortDescriptor?: SortDescriptor;
  onSortChange?: (descriptor: SortDescriptor) => void;
  classNames?: TableProps["classNames"];
}

export function CustomTable<T>({
  columns,
  data,
  renderCell,
  sortDescriptor,
  onSortChange,
  classNames
}: CustomTableProps<T>) {
  return (
    <Table
      aria-label="Data table"
      sortDescriptor={sortDescriptor}
      onSortChange={onSortChange}
      classNames={{
        thead: "bg-secondary",
        th: "text-default-500",
        tr: "border-b border-secondary",
        td: "text-sm", // Add default text styling for cells
        ...classNames
      }}
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn 
            key={column.uid} 
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={data}>
        {(item) => (
          <TableRow>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey.toString())}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}