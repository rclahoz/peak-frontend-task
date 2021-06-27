import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { PopupNotification } from 'src/app/models/notification';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class NotificationComponent implements OnInit {

  msg: string;
  hide = false;
  init= false;

  constructor(private notificationSvc: NotificationService) { }

  ngOnInit() {
    this.notificationSvc.notificationDispatchEvent.subscribe((notification: PopupNotification) => {
      this.init = true;
      this.hide = false;
      const { notficationMsg, notficationType } = notification;
      this.msg = notficationMsg;
      setTimeout(()=> {
        this.hide = true;
        this.init = false;
      }, 1000)
    });
  }

}
