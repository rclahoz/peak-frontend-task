import { Component, OnDestroy, OnInit } from '@angular/core';
import { forkJoin, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AppService } from 'src/app/services/app.service';
import { InfoService } from 'src/app/services/info.service';

@Component({
  selector: 'app-bookmark-list',
  templateUrl: './bookmark-list.component.html',
  styleUrls: ['./bookmark-list.component.scss']
})
export class BookmarkListComponent implements OnInit, OnDestroy {

  notifier = new Subject();
  bookmarArticlesList: any[] = [];
  loading = true;
  showErrorMsg: boolean;
  errorMsg = '';

  constructor(private appService: AppService, private infoService: InfoService) { }

  ngOnInit(): void {
    this.showErrorMsg = false;
    this.appService.setTitleName('All bookmark');
    this.appService.setButtonVisibility(false);
    const { savedArticlesIds: ids } = this.infoService;
    if(ids.length >0 ) {
      this.loadArticles(ids);
    } else {
      this.loading = false;
    }

  }

  loadArticles(ids: string[]) {

    forkJoin(
      ids.map(id =>
        this.infoService.getArticleDetail(id)
      )
    ).pipe(takeUntil(this.notifier))
    .subscribe(data=> {
      this.bookmarArticlesList = data;
      this.loading = false;
    },
    error => {
      this.handleError(error)
    });
  }

  ngOnDestroy() {
    this.notifier.next()
    this.notifier.complete()
  }

  handleError(error: string) {
    this.loading = false;
    this.showErrorMsg = true;
    this.errorMsg = error;
  }
}
