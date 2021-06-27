import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { InfoService } from './info.service';
import { apiResponse, mappedCategoryResponse, mappedNewResponse } from '../models/mocked-test-data';
import {HttpTestingController, HttpClientTestingModule} from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';

fdescribe('InfoService', () => {
  let service: InfoService;
  let httpMock: HttpTestingController;
  const apiKey = environment.apiKey;
  const baseUrl = environment.baseUrl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [InfoService]
    }).compileComponents();
    service = TestBed.inject(InfoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call the service', () => {
    const serviceCallled = TestBed.inject(InfoService);
        expect(serviceCallled).toBeTruthy();
  });

  it('should to retrieve news from the API', () => {
    const dummyNews = apiResponse;
    service.getAllTopNewsOrderedRequest().subscribe(response => {
        expect(response.response.results.length).toBe(2);
        expect(response).toEqual(dummyNews);
    });

    const request = httpMock.expectOne( `${baseUrl}/search?order-by=${`newest`}&show-fields=thumbnail`);
    expect(request.request.method).toBe('GET');
    request.flush(dummyNews);
  });

  it('should to retrieve category from the API', () => {
    const dummyCategoryNews = apiResponse;
    service.getAllNewsByCategoriesOrderedRequest().subscribe(response => {
        expect(response.response.results.length).toBe(2);
        expect(response).toEqual(dummyCategoryNews);
    });

    const request = httpMock.expectOne( `${baseUrl}/search?section=sport&order-by=${`newest`}&show-fields=thumbnail`);
    expect(request.request.method).toBe('GET');
    request.flush(dummyCategoryNews);
  });

  it('should to retrieve article Id from the API', () => {
    const id = 'sport/live/2021/jun/27/england-v-india-first-womens-odi-live-cricket';
    service.getArticleSelectedDetail(id).subscribe(response => {
        expect(response.content.id).toEqual(id);
    });

    const request = httpMock.expectOne( `${baseUrl}/${id}?show-fields=bodyText,thumbnail,headline`);
    expect(request.request.method).toBe('GET');
  });

  it('should tranforms response from api to a news object ', () => {
    const dummyMappedNews = mappedNewResponse;
    service.getTopNews('newest').subscribe(response => {
        expect(response.length).toBe(2);
        expect(response).toEqual(dummyMappedNews);
    });
    const request = httpMock.expectOne( `${baseUrl}/search?order-by=${`newest`}&show-fields=thumbnail`);
    expect(request.request.method).toBe('GET');
    request.flush(dummyMappedNews);
  });

  it('should retrieve Sport category from API ', () => {
    service.getAllNewsByCategories('newest').subscribe(response => {
        expect(response.length).toBe(2);
        expect(response[0].key).toEqual('Sports');
    });
    const request = httpMock.expectOne( `${baseUrl}/search?section=sport&order-by=${`newest`}&show-fields=thumbnail`);
    expect(request.request.method).toBe('GET');
  });

  it('should retrieve Sport category list from API ', () => {
    const dummyMappedCategory = mappedCategoryResponse;
    service.getAllNewsByCategories('newest').subscribe(response => {
        expect(response.length).toBe(2);
        expect(response[0].key).toEqual('Sports');
        expect(response[0]).toEqual(dummyMappedCategory);
    });
    const request = httpMock.expectOne( `${baseUrl}/search?section=sport&order-by=${`newest`}&show-fields=thumbnail`);
    expect(request.request.method).toBe('GET');
    request.flush(dummyMappedCategory);
  });

  afterEach(() => {
    httpMock.verify();
  });
})
