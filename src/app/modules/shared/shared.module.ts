import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/shared/header/header.component';
import { FooterComponent } from '../../components/shared/footer/footer.component';
import { CardComponent } from '../../components/shared/card/card.component';
import { ArticleCardComponent } from '../../components/shared/article-card/article-card.component';
import { SearchComponent } from '../../components/shared/search/search.component';
import { SpinnerComponent } from '../../components/shared/spinner/spinner.component';
import { SectionHeaderComponent } from 'src/app/components/shared/section-header/section-header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { InfiniteScrollComponent } from '../../components/shared/infinite-scroll/infinite-scroll.component';
import { NotificationComponent } from '../../components/shared/notification/notification.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    CardComponent,
    ArticleCardComponent,
    SearchComponent,
    SectionHeaderComponent,
    SpinnerComponent,
    InfiniteScrollComponent,
    NotificationComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    CardComponent,
    ArticleCardComponent,
    SectionHeaderComponent,
    SpinnerComponent,
    InfiniteScrollComponent,
    NotificationComponent
  ],
})
export class SharedModule { }
