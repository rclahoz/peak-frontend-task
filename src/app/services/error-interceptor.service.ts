import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor,HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  intercept( request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
        .pipe(
            retry(1),
            catchError((error: HttpErrorResponse) => {
                let errorMessage = '';
                if (error.error instanceof ErrorEvent) {
                    // client-side error
                    errorMessage = `Error: ${error.error.message}`;
                } else {
                    errorMessage = this.handleErrorMsg(error.status);
                }
                console.log(errorMessage);
                return throwError(errorMessage);
            })
        )
  }

  handleErrorMsg(status: number): string {
    let msg = ''
    if(status === 0) {
      msg = `There was a connection problems. Please try again later`;
    } else if(status === 401) {
      msg = `There was an authorization problems.Check with your administrator.`;
    } else {
      msg = `There was a problem. Try again later or check with your administrator.`;
    }
    return msg;
  }
}
