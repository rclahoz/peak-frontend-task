import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { PopupNotification } from '../models/notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  
  notificationDispatchEvent = new Subject<PopupNotification>();
  
  showUserPopupNotification(show: PopupNotification) : void {
    this.notificationDispatchEvent.next(show);
  }
  
}
