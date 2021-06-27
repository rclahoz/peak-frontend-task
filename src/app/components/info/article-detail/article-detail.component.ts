import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { ArticleDetail, ArticleId } from 'src/app/models/article-detail';
import { AppService } from 'src/app/services/app.service';
import { InfoService } from 'src/app/services/info.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss']
})
export class ArticleDetailComponent implements OnInit, OnDestroy {

  notifier = new Subject();
  article: ArticleDetail;
  loading = true;
  articleId: string = '';
  buttonTitle = '';
  showErrorMsg: boolean;
  errorMsg = '';

  constructor(
      private activeRoute: ActivatedRoute,
      private info: InfoService,
      private appService: AppService,
      private notificationService: NotificationService,
      @Inject(DOCUMENT) private document: Document) { }

  ngOnInit(): void {
    this.document.body.scrollTop = 0;
    this.document.documentElement.scrollTop = 0;
    this.showErrorMsg = false;
    this.checkArticleInBookMark();
    this.appService.setVisibility(false);
    this.appService.setButtonVisibility(true);
    this.activeRoute.params.pipe(
      takeUntil(this.notifier),
      switchMap((data: ArticleId) => {
        const { id } = data;
        this.articleId = id;
        return this.getArticleDetail(id)
      })
    ).subscribe(data => {
      this.checkArticleInBookMark();
      this.updateArticle(data);
      this.loading = false;
    },
    error => {
      this.handleError(error);
    });
  }

  handleError(error: string) {
    this.loading = false;
    this.showErrorMsg = true;
    this.errorMsg = error;
  }

  onBookmark(){
    return this.isArticleInBookmark() ? this.deleteArticleFromBookmarkList() : this.addArticleToBookmarkList();
  }

  checkArticleInBookMark() {
    return this.isArticleInBookmark() ? this.changeButtonTitle('remove bookmark'): this.changeButtonTitle('add bookmark');;
  }

  isArticleInBookmark(): boolean {
    const pos = this.info.savedArticlesIds.findIndex(article => article === this.articleId);
    return pos >= 0;
  }

  getArticleDetail(id: string) {
    return this.info.getArticleDetail(id).pipe(takeUntil(this.notifier));
  }

  updateArticle(response: ArticleDetail) {
    const { bodyText, webPublicationDate, webTitle, headline, thumbnail } = response
    this.article = {
      bodyText,
      webPublicationDate,
      webTitle,
      headline,
      thumbnail
    }
  }

  itemToBookmark(addToBookmark: boolean): void {
    if(addToBookmark) {
      this.addArticleToBookmarkList();
    } else {
      this.deleteArticleFromBookmarkList();
    }
  }

  addArticleToBookmarkList() {
      this.info.savedArticlesIds.push(this.articleId);
      this.changeButtonTitle('remove bookmark');
      this.notificationService.showUserPopupNotification({notficationMsg: 'Article added succesfuly', notficationType: 'sucess'});
  }

  deleteArticleFromBookmarkList() {
    const pos = this.info.savedArticlesIds.findIndex(article => article === this.articleId);
    if(pos >= 0) {
      this.info.savedArticlesIds.splice(pos, 1);
      this.changeButtonTitle('add bookmark');
      this.notificationService.showUserPopupNotification({notficationMsg: 'Article removed succesfuly', notficationType: 'sucess'});
    }

  }
  changeButtonTitle(title: string) {
    this.buttonTitle = title;
  }

  ngOnDestroy() {
    this.notifier.next()
    this.notifier.complete()
  }

}
