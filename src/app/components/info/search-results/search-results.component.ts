import { ArticleCard } from './../../../models/article-detail';
import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { AppService } from 'src/app/services/app.service';
import { InfoService } from 'src/app/services/info.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit, OnDestroy {

  searchResultList: any [] = [];
  loading = true;
  initialPage = 1;
  userSearch;
  orderPriority = '';
  notifier = new Subject();
  showErrorMsg: boolean;
  errorMsg = '';

  constructor(
        private infoService: InfoService,
        private appService: AppService,
        @Inject(DOCUMENT) private document: Document) { }

  ngOnInit(): void {
    this.showErrorMsg = false;
     this.appService.orderTypeAndSearch.subscribe(data => {
       this.searchResultList = [];
       const {order, search } = data;
       this.loadData(order, search);
     });

  }

  handleError(error: any) {
    this.loading = false;
    this.showErrorMsg = true;
    this.errorMsg = error;
  }

  loadData(orderType: string, userSearchConditions: string) {
    this.loading = true;
    this.userSearch = userSearchConditions;
    this.infoService.searchTermns(userSearchConditions, this.initialPage, orderType)
    .pipe(takeUntil(this.notifier))
      .subscribe(
        data => this.updateData(data),
        error => {
          this.handleError(error);
        });
  }

  updateData(data: ArticleCard[]) {
    data.forEach( (item: ArticleCard) => this.searchResultList.push(item));
    this.loading = false;
  }

  onLoadNextItems() {
    this.loading = true;
    this.initialPage++;
    this.infoService.searchTermns(this.userSearch, this.initialPage).subscribe((response: ArticleCard[])=> {
     this.updateData(response);
    });
  }

  goUp(){
    this.document.body.scrollTop = 0;
    this.document.documentElement.scrollTop = 0;
  }

  ngOnDestroy() {
    this.notifier.next()
    this.notifier.complete()
  }
}
