export interface KnowledgeItem {
  id: string;
  title: string;
  description: string;
  category: KnowledgeCategory;
  subcategory: string;
  tags: string[];
  author: string;
  createdAt: string;
  updatedAt: string;
  views: number;
  downloads?: number;
  rating: number;
  fileType?: string;
  fileSize?: string;
  thumbnail?: string;
  content?: string;
  externalUrl?: string;
}

export type KnowledgeCategory = 
  | 'theory'
  | 'standards'
  | 'papers'
  | 'patents'
  | 'cases-positive'
  | 'cases-negative'
  | 'simulation'
  | 'software-guides';

export interface CategoryInfo {
  id: KnowledgeCategory;
  name: string;
  nameEn: string;
  description: string;
  icon: string;
  color: string;
  subcategories: string[];
}

export interface FilterState {
  category: KnowledgeCategory | 'all';
  subcategory: string | 'all';
  tags: string[];
  searchQuery: string;
  sortBy: 'newest' | 'popular' | 'rating' | 'name';
  viewMode: 'grid' | 'list';
}

export interface SearchSuggestion {
  id: string;
  title: string;
  category: string;
  type: 'item' | 'tag' | 'category';
}
