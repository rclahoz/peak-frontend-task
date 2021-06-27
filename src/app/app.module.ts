import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InfoModule } from './modules/info/info.module';
import { SharedModule } from './modules/shared/shared.module';
import { RequestInterceptor } from './services/request-interceptor.service';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { ErrorInterceptor } from './services/error-interceptor.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    InfoModule,
    HttpClientModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production, registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  providers: [  { 
                  provide: HTTP_INTERCEPTORS,
                  useClass: RequestInterceptor,
                  multi: true
                },
                {
                  provide: HTTP_INTERCEPTORS,
                  useClass: ErrorInterceptor,
                  multi: true
                }
            ],
  bootstrap: [AppComponent]
})
export class AppModule { }
