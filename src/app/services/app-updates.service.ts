import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker'

@Injectable({
  providedIn: 'root'
})
export class AppUpdatesService {

  constructor(private update: SwUpdate) { }

  checkForUpdates(){
    this.update.available.subscribe(event => {
      if(confirm('PWA updates')){
        this.update.activateUpdate().then(()=>document.location.reload());
      }
    });
  }
}
