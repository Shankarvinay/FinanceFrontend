import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  //implemented using HttpInterceptor
  //this add a JWT auth token to the HTTP Authorization header
  //modify http requests before they get sent to the server.
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (localStorage.getItem('token') != null) {
      //if the token is not null
      //we create a copy of the current request
      const clonedReq = req.clone({
        headers: req.headers.set(
          'Authorization',
          'Bearer ' + localStorage.getItem('token')
        ),
      });
      //next.handle is for modifying the request
      return next.handle(clonedReq).pipe(
        tap(
          (succ) => {},
          (err) => {
            if (err.status == 401) {                //if the request status is 401 redirect to login page otherwise show forbidden page
              localStorage.removeItem('token');
              this.router.navigateByUrl('/');
            } else if (err.status == 403) {
              this.router.navigateByUrl('/forbidden');
            }
          }
        )
      );
    } else return next.handle(req.clone());         //not modifying the request if token is null
  }
}
