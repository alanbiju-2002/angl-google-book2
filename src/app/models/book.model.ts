export interface VolumeInfo {
  title: string;
  authors?: string[];
  publisher?: string;
  publishedDate?: string;
  description?: string;
  pageCount?: number;
  categories?: string[];
  imageLinks?: {
    thumbnail?: string;
    smallThumbnail?: string;
  };
  language?: string;
  previewLink?: string;
  infoLink?: string;
}

export interface Book {
  id: string;
  volumeInfo: VolumeInfo;
  accessInfo?: {
    embeddable?: boolean;
    epub?: {
      isAvailable: boolean;
    };
    pdf?: {
      isAvailable: boolean;
    };
  };
}

export interface GoogleBooksResponse {
  items: Book[];
  totalItems: number;
}