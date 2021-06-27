export interface TopNewsResponse {
    response: NewsResponse;
}

export interface NewsResponse {
    currentPage: number;
    orderBy: string;
    pageSize: number;
    pages: number;
    results: any []
    startIndex: number;
    status: string;
    total: number;
    userTier: string;
}

export interface NewsResponseItem {
  apiUrl: string;
  fields: any;
  id: string;
  isHosted: boolean;
  pillarId: string;
  pillarName: string;
  sectionId: string;
  sectionName: string;
  type: string;
  webPublicationDate: string;
  webTitle: string;
  webUrl: string;
}

export interface News {
  id: string;
  pillarName: string;
  sectionId: string;
  sectionName: string;
  webPublicationDate: string;
  webTitle: string;
  webUrl: string;
  thumbnail: string | null;
}
