import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Search } from '../models/order-list';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  userSelectionData: Search = { order: 'newest', search: ''};
  visibilityDispatcher = new BehaviorSubject<boolean>(true);
  buttonVisibilityDispatcher = new BehaviorSubject<boolean>(true);
  titleNameDispatcher = new BehaviorSubject<string>('Top stories');
  buttonTtitleDispatcher = new BehaviorSubject<string>('view bookmarks');
  orderTypeNameDispatcher = new BehaviorSubject<string>('newest');
  orderTypeAndSearch = new BehaviorSubject<Search>(this.userSelectionData);

  constructor() { }

  setVisibility(show: boolean): void {
    this.visibilityDispatcher.next(show);
  }

  setButtonVisibility(show: boolean): void {
    this.buttonVisibilityDispatcher.next(show);
  }

  setTitleName(name: string): void {
    this.titleNameDispatcher.next(name);
  }

  setButtonTitle(name: string): void {
    this.buttonTtitleDispatcher.next(name);
  }

  setUserSelectionAndDispatchCurrentData(newSelection: Search): void{
    this.userSelectionData = newSelection;
    this.setOrderAndSearchTermsNotification(this.userSelectionData);
  }

  getUserSelectionData(): Search {
    return this.userSelectionData;
  }

  setOrderAndSearchTermsNotification(event: Search): void{
    this.orderTypeAndSearch.next(event);
  }
}
