import { Component, OnDestroy, OnInit } from '@angular/core';
import { forkJoin, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AppService } from 'src/app/services/app.service';
import { InfoService } from 'src/app/services/info.service';

@Component({
  selector: 'app-news-content',
  templateUrl: './news-content.component.html',
  styleUrls: ['./news-content.component.scss']
})
export class NewsContentomponent implements OnInit, OnDestroy {

  loading = true;
  topNewsList = [];
  articlesList = [];
  notifier = new Subject();
  showErrorMsg: boolean;
  errorMsg = '';

  constructor(private info: InfoService, private appService: AppService) { }

  ngOnInit(): void {
    this.showErrorMsg = false;
    this.initData();
    this.appService.orderTypeAndSearch.pipe(takeUntil(this.notifier))
      .subscribe(data=> {
        const { order } = data;
        this.loading = true;
        forkJoin([
            this.loadAllTopNews(order),
            this.loadAllNewByCategories(order)
          ]).pipe(takeUntil(this.notifier))
        .subscribe((data: any)=> {
          this.topNewsList = data[0];
          this.articlesList = data [1];
          this.loading = false;
          this.showErrorMsg = false;
        },
        error => {
          this.handleError(error);
        });
    });
  }

  handleError(error: any) {
    this.loading = false;
    this.showErrorMsg = true;
    this.errorMsg = error;
  }

  initData() {
    this.appService.setTitleName('Top stories');
    this.appService.setButtonTitle('view bookmark');
    this.appService.setButtonVisibility(true);
    this.appService.setVisibility(true);
  }

  loadAllTopNews(order: string) {
    return this.info.getTopNews(order);
  }

  loadAllNewByCategories(order: string) {
    return this.info.getAllNewsByCategories(order);
  }

  ngOnDestroy() {
    this.notifier.next()
    this.notifier.complete()
  }

}
