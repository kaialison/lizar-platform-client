"use client";
import { useState, useCallback, useEffect } from "react";
import Image from 'next/image';
import { User, Chip, Switch, Button, Tooltip } from "@nextui-org/react";
import { CustomTable } from "@/components/common/CustomTable";
import { CustomFilter } from "@/components/common/CustomFilter";
import { CustomSearch } from "@/components/common/CustomSearch";
import { KeywordData, TableColumnData } from "@/types/keyword";
import { SortDescriptor, RangeValue } from "@nextui-org/react";
import { DateValue } from "@internationalized/date";
import { dateValueToDate } from "../utils";

interface KeywordPageClientProps {
  initialData: KeywordData[];
}

export const KeywordPageClient = ({ initialData }: KeywordPageClientProps) => {
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

  // --- State for Filters ---
  const [selectedDateRange, setSelectedDateRange] = useState<RangeValue<DateValue>>();
  const [selectedMarketer, setSelectedMarketer] = useState<string>(""); // Use empty string or 'all'
  const [selectedCategory, setSelectedCategory] = useState<string>(""); // Use empty string or 'all'
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [filteredData, setFilteredData] = useState<KeywordData[]>(initialData); // Data to display
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "id",
    direction: "ascending",
  });

  // --- Effect for Filtering ---
  useEffect(() => {
    let dataToFilter = [...initialData]; // Start fresh with original data
    
    // Apply filters in sequence:
    // 1. Date range filter
    const startDate = dateValueToDate(selectedDateRange?.start);
    const endDateVal = selectedDateRange?.end;
    let endDate: Date | null = null;
    if (endDateVal) {
        endDate = dateValueToDate(endDateVal);
        if (endDate) {
            // Set to end of the day (UTC) for inclusive range
            endDate.setUTCHours(23, 59, 59, 999);
        }
    }

    if (startDate && endDate) {
      dataToFilter = dataToFilter.filter(item => {
        try {
          // Ensure item.createdAt is a valid date string for new Date()
          const itemDate = new Date(item.createdAt + 'T00:00:00Z'); // Assume UTC if only date is provided
          if (isNaN(itemDate.getTime())) {
              console.warn(`Invalid createdAt date for item ID ${item.id}: ${item.createdAt}`);
              return false;
          }
          return itemDate >= startDate && itemDate <= endDate!;
        } catch (e) {
            console.error(`Error parsing date for item ID ${item.id}: ${item.createdAt}`, e);
            return false;
        }
      });
    }
    
    // 2. Marketer filter
    if (selectedMarketer && selectedMarketer !== 'all') {
      dataToFilter = dataToFilter.filter(item =>
        // Assuming the key in options matches the marketer's name exactly (case-insensitive)
        item.marketer.name.toLowerCase() === selectedMarketer.toLowerCase()
      );
    }
    
    // 3. Category filter
    if (selectedCategory && selectedCategory !== 'all') {
      dataToFilter = dataToFilter.filter(item =>
        // Assuming the key in options matches the category exactly (case-insensitive)
        item.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }
    
    // 4. Search term filter
    if (searchTerm) {
      const lowerCaseSearch = searchTerm.toLowerCase();
      dataToFilter = dataToFilter.filter(item =>
          item.id.toString().includes(lowerCaseSearch) ||
          item.setKeyword.toLowerCase().includes(lowerCaseSearch) ||
          (Array.isArray(item.keyword) && item.keyword.some(k => k.toLowerCase().includes(lowerCaseSearch)))
      );
    }

    setFilteredData(dataToFilter);
  }, [selectedDateRange, selectedMarketer, selectedCategory, searchTerm, initialData]);

  useEffect(() => {
    if (sortDescriptor.column) {
      const sortedData = [...filteredData].sort((a, b) => {
        const first = a[sortDescriptor.column as keyof KeywordData];
        const second = b[sortDescriptor.column as keyof KeywordData];

        let cmp = 0;
        if (sortDescriptor.column === 'createdAt') {
            const dateA = new Date(a.createdAt).getTime();
            const dateB = new Date(b.createdAt).getTime();
            cmp = dateA < dateB ? -1 : dateA > dateB ? 1 : 0;
        } else if (first === undefined || first === null) {
            cmp = -1;
        } else if (second === undefined || second === null) {
            cmp = 1;
        } else if (typeof first === 'string' && typeof second === 'string') {
            cmp = first.localeCompare(second); // Use localeCompare for strings
        } else if (first < second) {
            cmp = -1;
        } else if (first > second) {
            cmp = 1;
        }

        return sortDescriptor.direction === "descending" ? -cmp : cmp;
      });

      // Only update state if the sorted data is actually different
      // This prevents potential infinite loops if sorting doesn't change order
      if (JSON.stringify(sortedData) !== JSON.stringify(filteredData)) {
          setFilteredData(sortedData);
      }
    }
  }, [sortDescriptor, filteredData]); // Run when sort changes or filtered data changes


  // --- Handlers ---
  const handleSortChange = useCallback((descriptor: SortDescriptor) => {
    setSortDescriptor(descriptor);
    // Sorting logic is now handled by the useEffect hook above
  }, []);

  const handleSearchChange = useCallback((value: string) => {
      setSearchTerm(value);
  }, []);

  const handleToggleActive = useCallback(async (id: number, isActive: boolean) => {
    try {
      // You can add API call here
      // await updateKeywordStatus(id, isActive);
      
      // Update local state
      setFilteredData(prevData => 
        prevData.map(item => 
          item.id === id ? { ...item, isActive } : item
        )
      );
    } catch (error) {
      console.error('Error toggling status:', error);
      // You might want to show an error toast here
    }
  }, []);


  // --- Render Cell Logic ---
  const renderCell = useCallback((item: KeywordData, columnKey: string | React.Key) => {
    const key = columnKey as keyof KeywordData | "actions"; // Type assertion

    switch (key) {
      case "keyword":
        // Ensure keyword is an array before joining
        return (
          <span className="text-tertiary-600">
            {Array.isArray(item.keyword) ? item.keyword.join(", ") : item.keyword || ''}
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
                  : "bg-utility-grey-50 border-2 border-utility-grey-200 text-utility-grey-700" // Draft or others
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
            isSelected={item.isActive} // Control the switch state based on data
            size="sm"
            color="primary"
            classNames={{
              wrapper: "group-data-[selected=true]:bg-brand-solid"
            }}
            aria-label={item.isActive ? "Active" : "Inactive"}
            onChange={(e) => handleToggleActive(item.id, e.target.checked)}
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
          <div className="relative flex items-center gap-2">
            <Tooltip content="View">
              <Button isIconOnly size="sm" variant="light" aria-label="View item">
                <Image src="/icons/info-circle.svg" alt="View" width={20} height={20} />
              </Button>
            </Tooltip>
            <Tooltip content="Edit">
              <Button isIconOnly size="sm" variant="light" aria-label="Edit item">
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
       case "createdAt":
         // Format date for display
         try {
            // Use toLocaleDateString for user-friendly format
            return new Date(item.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
         } catch {
            return item.createdAt; // Fallback if date is invalid
         }
      default:
        // Access value safely using the key
        const value = item[key as keyof KeywordData];
        // Handle potential objects/arrays before converting to string
        if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
            // Avoid displaying complex objects directly, maybe show an ID or name
            return '[Object]';
        }
        // Return value as string, handle null/undefined
        return String(value ?? '');
    }
  }, []); // Empty dependency array for useCallback as renderCell doesn't depend on external state changing frequently

  return (
    <div className="p-6 space-y-4">
      {/* Filters Section */}
      <div className="flex gap-4"> {/* Use flex-wrap for responsiveness */}
        <CustomFilter
          type="date"
          label="Time"
          placeholder="Select date range"
          dateValue={selectedDateRange} // Pass state value
          onDateChange={(value) => setSelectedDateRange(value || undefined)} // Pass state setter
        />
        <CustomFilter
          label="Marketer"
          placeholder="All"
          options={[
            { key: "all", label: "All" },
            // Ensure keys match the data you want to filter by (case-insensitive handled in filter logic)
            { key: "John Doe", label: "John Doe" },
            { key: "Jane Smith", label: "Jane Smith" },
          ]}
          value={selectedMarketer} // Pass state value
          onChange={setSelectedMarketer} // Pass state setter
        />
        <CustomFilter
          label="Category"
          placeholder="All"
          options={[
            { key: "all", label: "All" },
            // Ensure keys match the data
            { key: "Training", label: "Training" },
            { key: "Competition", label: "Competition" },
          ]}
          value={selectedCategory} // Pass state value
          onChange={setSelectedCategory} // Pass state setter
        />
      </div>

      {/* Header and Search Section */}
      <div className="flex justify-between items-center flex-wrap gap-y-2"> {/* Use flex-wrap */}
        {/* Display count of *filtered* items */}
        <h1 className="text-xl font-semibold">{filteredData.length} Set Keyword</h1>
        <CustomSearch
          placeholder="Search by ID, set keyword or keyword"
          className="w-full sm:w-[300px]" // Responsive width
          value={searchTerm} // Control search input
          onSearch={handleSearchChange} // Use specific handler
          aria-label="Search keywords"
          // Consider adding debouncing to onSearch if API calls are involved
        />
      </div>

      {/* Table Section */}
      <CustomTable
        columns={columns}
        data={filteredData} // Pass the filtered and sorted data
        renderCell={renderCell}
        sortDescriptor={sortDescriptor}
        onSortChange={handleSortChange}
        aria-label="Keyword Data Table"
      />
    </div>
  );
};
