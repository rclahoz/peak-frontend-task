export interface ArticleDetail {
    bodyText: string;
    webPublicationDate: string;
    webTitle: string;
    headline: string;
    thumbnail?: string;
}

export interface DetailResponse {
  content: DetailContentResponse ;
  status: string;
  total: number;
  userTier: string;
}

export interface DetailContentResponse {
  id: string;
  fields: any;
  webPublicationDate: string;
  webTitle: string;
}

export interface ArticleId {
  id: string;
}

export interface Article {
  key: string;
  list: ArticleList [];
}

export interface ArticleList {
  id: string;
  pillarName: string;
  sectionId: string;
  sectionName: string;
  thumbnail: string;
  webPublicationDate: string;
  webTitle: string;
  webUrl: string;
}

export interface ArticleCard {
  id: string;
  pillarName: string;
  sectionId: string;
  sectionName: string;
  thumbnail: string;
  webPublicationDate: string;
  webTitle: string;
  webUrl: string;
  body?: string;
}
