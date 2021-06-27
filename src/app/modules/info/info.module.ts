import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InfoRoutingModule } from './info-routing.module';
import { NewsContentomponent } from '../../components/info/news-content/news-content.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ArticleCategoryListComponent } from '../../components/info/article-category-list/article-category-list.component';
import { ArticleDetailComponent } from '../../components/info/article-detail/article-detail.component';
import { RouterModule } from '@angular/router';
import { SearchResultsComponent } from '../../components/info/search-results/search-results.component';
import { BookmarkListComponent } from '../../components/info/bookmark-list/bookmark-list.component';


@NgModule({
  declarations: [
    NewsContentomponent,
    ArticleCategoryListComponent,
    ArticleDetailComponent,
    SearchResultsComponent,
    BookmarkListComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    InfoRoutingModule
  ]
})
export class InfoModule { }
