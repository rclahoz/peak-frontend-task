import { Component, Input, OnInit } from '@angular/core';
import { Article } from 'src/app/models/article-detail';

@Component({
  selector: 'app-article-category-list',
  templateUrl: './article-category-list.component.html',
  styleUrls: ['./article-category-list.component.scss']
})
export class ArticleCategoryListComponent implements OnInit {
  @Input() articleList: Article;
  articleName= '';
  articleElments = [];

  constructor() { }

  ngOnInit(): void {
    const { key = '', list = [] } = this.articleList;
    this.articleName = key;
    this.articleElments = list;
  }

}
