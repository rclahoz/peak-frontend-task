import { Component, Input, OnInit } from '@angular/core';
import { ArticleCard } from 'src/app/models/article-detail';

@Component({
  selector: 'app-article-card',
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.scss']
})
export class ArticleCardComponent implements OnInit {
  @Input() item: ArticleCard;
  @Input() isSearch: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

}
