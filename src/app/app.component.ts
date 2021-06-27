import { Component } from '@angular/core';
import { AppUpdatesService } from './services/app-updates.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'peakTest';
  titleValue = 'Top stories';

  constructor(private pwaUpdates: AppUpdatesService){
    this.pwaUpdates.checkForUpdates();
  }
}
