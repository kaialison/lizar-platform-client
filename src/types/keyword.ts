export interface Marketer {
    name: string;
    email: string;
    avatar?: string;
  }
  
  export interface KeywordData {
    id: number;
    setKeyword: string;
    keyword: string[]; // Changed from string to string[]
    category: string;
    status: 'Published' | 'Draft' | 'Pending';
    isActive: boolean;
    marketer: {
      name: string;
      email: string;
      avatar?: string;
    };
    createdAt: string;
  }
  
  export interface TableColumnData {
    name: string;
    uid: string;
    sortable?: boolean;
  }