import { KeywordData } from "@/types/keyword";

// This would be replaced with actual API calls in a real implementation
export async function getKeywordData(): Promise<KeywordData[]> {
  // Mock data - in a real app, this would be fetched from an API
  const mockData: KeywordData[] = [
    {
      id: 1,
      setKeyword: "Pickleball Basics",
      keyword: ["Beginner Techniques", "Basic Rules", "Getting Started"],
      category: "Training",
      status: "Published",
      isActive: true,
      marketer: { name: "John Doe", email: "john@example.com", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d" },
      createdAt: "2025-04-04", // Store as ISO string or YYYY-MM-DD
    },
    {
      id: 2,
      setKeyword: "Advanced Strategies",
      keyword: ["Tournament Play"],
      category: "Competition",
      status: "Draft",
      isActive: false,
      marketer: { name: "Jane Smith", email: "jane@example.com", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704e" },
      createdAt: "2023-10-15",
    },
    {
      id: 3,
      setKeyword: "Advanced Strategies",
      keyword: ["Tournament Play"],
      category: "Competition",
      status: "Pending",
      isActive: false,
      marketer: { name: "Jane Smith", email: "jane@example.com", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026705e" },
      createdAt: "2023-11-05", // Changed date for testing
    },
  ];

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100));
  
  return mockData;
}
