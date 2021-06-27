import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleDetailComponent } from './components/info/article-detail/article-detail.component';
import { BookmarkListComponent } from './components/info/bookmark-list/bookmark-list.component';
import { NewsContentomponent } from './components/info/news-content/news-content.component';
import { SearchResultsComponent } from './components/info/search-results/search-results.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: NewsContentomponent
  },
  {
    path: 'article-detail/:id',
    component: ArticleDetailComponent
  },
  {
    path: 'search-results',
    component: SearchResultsComponent
  },
  {
    path: 'bookmark-list',
    component: BookmarkListComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
