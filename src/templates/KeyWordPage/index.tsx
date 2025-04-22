"use client";
import { useState, useCallback } from "react";
import Image from 'next/image';
import { User, Chip, Switch, Button, Tooltip } from "@nextui-org/react";
import { CustomTable } from "@/components/common/CustomTable";
import { CustomFilter } from "@/components/common/CustomFilter";
import { CustomSearch } from "@/components/common/CustomSearch";
import { KeywordData, TableColumnData } from "@/types/keyword";
import { SortDescriptor } from "@nextui-org/react";

const KeywordPage = () => {
  const columns: TableColumnData[] = [
    { name: "Id", uid: "id", sortable: true },
    { name: "Set Keyword", uid: "setKeyword", sortable: true },
    { name: "Keyword", uid: "keyword" },
    { name: "Category", uid: "category", sortable: true },
    { name: "Status", uid: "status" },
    { name: "On/Off", uid: "isActive" },
    { name: "Marketer", uid: "marketer" },
    { name: "Created At", uid: "createdAt", sortable: true },
    { name: "Actions", uid: "actions" },
  ];

  // Add mock data
  const mockData: KeywordData[] = [
    {
      id: 1,
      setKeyword: "Pickleball Basics",
      keyword: ["Beginner Techniques", "Basic Rules", "Getting Started"], // Array of keywords
      category: "Training",
      status: "Published",
      isActive: true,
      marketer: {
        name: "John Doe",
        email: "john@example.com",
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
      },
      createdAt: "2023-10-01",
    },
    {
      id: 2,
      setKeyword: "Advanced Strategies",
      keyword: ["Tournament Play"],
      category: "Competition",
      status: "Draft",
      isActive: false,
      marketer: {
        name: "Jane Smith",
        email: "jane@example.com",
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704e",
      },
      createdAt: "2023-10-15",
    },
    {
        id: 3,
        setKeyword: "Advanced Strategies",
        keyword: ["Tournament Play"],
        category: "Competition",
        status: "Pending",
        isActive: false,
        marketer: {
          name: "Jane Smith",
          email: "jane@example.com",
          avatar: "https://i.pravatar.cc/150?u=a042581f4e29026705e",
        },
        createdAt: "2023-10-15",
      },
  ];

  // Add state for data and sorting
  const [data, setData] = useState<KeywordData[]>(mockData);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "id",
    direction: "ascending",
  });

  // Handle sorting
  const handleSortChange = useCallback(
    (descriptor: SortDescriptor) => {
      setSortDescriptor(descriptor);

      if (descriptor.column && descriptor.direction) {
        const sortedData = [...data].sort((a, b) => {
          const first = a[descriptor.column as keyof KeywordData];
          const second = b[descriptor.column as keyof KeywordData];

          if (first === undefined || second === undefined) return 0;

          const cmp = first < second ? -1 : first > second ? 1 : 0;

          return descriptor.direction === "descending" ? -cmp : cmp;
        });

        setData(sortedData);
      }
    },
    [data]
  );

  const renderCell = (item: KeywordData, columnKey: string) => {
    switch (columnKey) {
      case "keyword":
        return (
          <span className="text-tertiary-600">
            {item.keyword.join(", ")}
          </span>
        );
      case "status":
        return (
          <Chip
            classNames={{
              base: `rounded-full ${
                item.status === "Published"
                  ? "bg-utility-success-50 border-2 border-utility-success-200 text-utility-success-700"
                  : item.status === "Pending"
                  ? "bg-utility-pink-50 border-2 border-utility-pink-200 text-utility-pink-700"
                  : "bg-utility-grey-50 border-2 border-utility-grey-200 text-utility-grey-700"
              }`,
              content: "text-sm font-medium"
            }}
            variant="flat"
          >
            {item.status}
          </Chip>
        );
      case "isActive":
        return (
          <Switch 
            defaultSelected 
            size="sm"
            color="primary"
            classNames={{
              wrapper: "group-data-[selected=true]:bg-brand-solid"
            }}
          />
        );
      case "marketer":
        return (
          <User
            name={item.marketer.name}
            description={item.marketer.email}
            avatarProps={{ src: item.marketer.avatar }}
          />
        );
      case "actions":
        return (
          <div className="flex gap-2">
            <Tooltip content="View">
              <Button isIconOnly size="sm" variant="light">
                <Image src="/icons/info-circle.svg" alt="View" width={20} height={20} />
              </Button>
            </Tooltip>
            <Tooltip content="Edit">
              <Button isIconOnly size="sm" variant="light">
                <Image src="/icons/edit.svg" alt="Edit" width={20} height={20} />
              </Button>
            </Tooltip>
          </div>
        );
      case "category":
        return (
          <span className="font-medium">
            {item.category}
          </span>
        );
      default:
        const value = item[columnKey as keyof KeywordData];
        return String(value);
    }
  };

  return (
    <div className="p-6 space-y-4">
      <div className="flex gap-4">
        <CustomFilter
          label="Time"
          placeholder="Jan 12, 2024 - Jan 18, 2024"
          options={[
            { key: "last7", label: "Last 7 days" },
            { key: "last30", label: "Last 30 days" },
            { key: "custom", label: "Custom range" },
          ]}
        />
        <CustomFilter
          label="Marketer"
          placeholder="All"
          options={[
            { key: "all", label: "All" },
            { key: "john", label: "John Doe" },
            { key: "jane", label: "Jane Smith" },
          ]}
        />
        <CustomFilter
          label="Category"
          placeholder="All"
          options={[
            { key: "all", label: "All" },
            { key: "training", label: "Training" },
            { key: "competition", label: "Competition" },
          ]}
        />
      </div>

      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">100 Set Keyword</h1>
        <CustomSearch
          placeholder="Search by ID, set keyword or keyword"
          className="w-[300px]"
        />
      </div>

      <CustomTable
        columns={columns}
        data={data}
        renderCell={renderCell}
        sortDescriptor={sortDescriptor}
        onSortChange={handleSortChange}
      />
    </div>
  );
};

export default KeywordPage;
