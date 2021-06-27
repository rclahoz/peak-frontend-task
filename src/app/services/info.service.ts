import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { concatMap, groupBy, map, mergeMap, tap, toArray } from 'rxjs/operators';
import { forkJoin, Observable, ReplaySubject } from 'rxjs';
import { ArticleDetail, DetailResponse } from '../models/article-detail';
import { News, NewsResponseItem, TopNewsResponse } from '../models/top-news-response';


@Injectable({
  providedIn: 'root'
})
export class InfoService {

  apiKey = environment.apiKey;
  savedArticlesIds: string [] = [];
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getAllTopNewsOrderedRequest(orderBy = 'newest'): Observable<TopNewsResponse> {
    return this.http.get<TopNewsResponse>(`${this.baseUrl}/search?order-by=${orderBy}&show-fields=thumbnail`)
  }

  getAllNewsByCategoriesOrderedRequest(orderBy = 'newest'): Observable<TopNewsResponse> {
    return this.http.get<TopNewsResponse>(`${this.baseUrl}/search?section=sport&order-by=${orderBy}&show-fields=thumbnail`);
  }

  searchByTerms(terms: string, pageNumber: number, orderType: string): Observable<TopNewsResponse> {
    return this.http.get<TopNewsResponse>(`${this.baseUrl}/search?q=${terms}&order-by=${orderType}&show-fields=thumbnail&page=${pageNumber}`);
  }

  getArticleSelectedDetail(id: string): Observable<DetailResponse> {
    return this.http.get<DetailResponse>(`${this.baseUrl}/${id}?show-fields=bodyText,thumbnail,headline`);
  }


  getTopNews(order: string): Observable<News[]> {
    return this.getAllTopNewsOrderedRequest(order).pipe(
      map((apiResponse: TopNewsResponse) => {
        return this.mappDataFromAPi(apiResponse);
      })
    );
  }

  getAllNewsByCategories(order: string) {
    return this.getAllNewsByCategoriesOrderedRequest(order).pipe(
      map((apiResponse: TopNewsResponse) => {
        return this.mappDataFromAPi(apiResponse);
      }),
      mergeMap((res: any) => res),
      groupBy((result:any) => result.sectionName),
      mergeMap(obs => {
        return obs.pipe(
            toArray(),
            map(items => {
                return { key:obs.key, list: items }
            })
        )
    }),
    toArray()
    )
  }

  searchTermns(term: string, pageNumber = 1, orderType= 'newest'): Observable<News[]> {
    return this.searchByTerms(term, pageNumber, orderType).pipe(
      map((apiResponse: TopNewsResponse) => {
        return this.mappDataFromAPi(apiResponse, true);
      })
    )
  }

  getArticleDetail(id: string): Observable<ArticleDetail>{
    return this.getArticleSelectedDetail(id).pipe(
      map((response: any) => {
        const { response: data } = response
        return this.transformData(data);
      })
    )
  }

  transformData(data: DetailResponse) {
    return {
      id:data.content.id,
      bodyText: data.content.fields.bodyText,
      webPublicationDate: data.content.webPublicationDate,
      webTitle:data.content.webTitle,
      headline: data.content.fields.headline,
      thumbnail: data.content.fields.thumbnail
    }
  }

  mappDataFromAPi(apiResponse: TopNewsResponse, search= false): News[] {
    const { response : { results }  } = apiResponse;
    const mappedResponse = results.map((item: NewsResponseItem) => {
      return {
        id: item.id,
        pillarName: item.pillarName,
        sectionId: item.sectionId,
        sectionName: item.sectionName,
        webPublicationDate: item.webPublicationDate,
        webTitle: item.webTitle,
        webUrl: item.webUrl,
        thumbnail: item.fields ? item.fields.thumbnail:
                   (!item.fields && search ) ? '../../../../assets/Logo_White.png':
                   null
      }
    })
    return mappedResponse;

  }

}

