import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { OrderList } from 'src/app/models/order-list';
import { AppService } from 'src/app/services/app.service';
import { InfoService } from 'src/app/services/info.service';

@Component({
  selector: 'app-section-header',
  templateUrl: './section-header.component.html',
  styleUrls: ['./section-header.component.scss']
})
export class SectionHeaderComponent implements OnInit, OnDestroy {

  @Input() title = '';
  @Input() showBookMark = true;
  notifier = new Subject();
  showComponent: Observable<boolean>;
  componentTitle: Observable<string>
  buttonTitle: string;
  isButtonVisible: Observable<boolean>;
  list: OrderList[]=[ { id: 'newest', value: 'Newest First'}, {id: 'oldest', value: 'Older First' }, {id: 'relevance', value: 'Most Popular' }];

  constructor(
      private info: InfoService,
      private appService: AppService,
      private router: Router) { }

  ngOnInit(): void {
    this.showComponent = this.appService.visibilityDispatcher;
    this.componentTitle = this.appService.titleNameDispatcher;
    this.isButtonVisible = this.appService.buttonVisibilityDispatcher;
    this.appService.buttonTtitleDispatcher.subscribe(title => this.buttonTitle = title);
  }

  form = new FormGroup({
    optionSelected: new FormControl('Newest First')
  });

  get f(){
    return this.form.controls;
  }


  orderChangeNotification(): void {
    const { value: { optionSelected } } = this.form;
    const value = this.list.find(item => item.value === optionSelected);
    const { id } = value;
    const currentSelection = this.appService.getUserSelectionData();
    currentSelection.order = id;
    this.appService.setUserSelectionAndDispatchCurrentData(currentSelection);
  }

  onBookmark(): void {
      this.router.navigate(['/bookmark-list']);
  }

  ngOnDestroy() {
    this.notifier.next()
    this.notifier.complete()
  }
}
