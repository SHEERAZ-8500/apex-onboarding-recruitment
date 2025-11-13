import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private toastr: ToastrService,
    private router: Router
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('authToken');
    let clonedReq = req;

    //  Auto attach token to every request
    if (token) {
      clonedReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
        url: req.url.startsWith('http') ? req.url : `${environment.apiBaseUrl}${req.url}` // auto prepend base URL
      });
    } else {
      // if no token, still add base URL
      clonedReq = req.clone({
        url: req.url.startsWith('http') ? req.url : `${environment.apiBaseUrl}${req.url}`
      });
    }

    return next.handle(clonedReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.toastr.error('Session expired. Please login again.', 'Unauthorized');
          localStorage.removeItem('authToken');
          this.router.navigate(['/login']);
        } else if (error.status === 403) {
          this.toastr.warning('Access denied.', 'Forbidden');
        } else if (error.status === 404) {
          this.toastr.info('Requested resource not found.', 'Not Found');
        } else if (error.status === 500) {
          this.toastr.error('Internal server error. Try again later.', 'Server Error');
        } else {
          this.toastr.error(error.message || 'Unexpected error occurred.');
        }

        return throwError(() => error);
      })
    );
  }
}
