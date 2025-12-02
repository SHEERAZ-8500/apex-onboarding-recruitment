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
import { ApiService } from '../services/apis/api.service';
import { EncryptionService } from '../services/encryption.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private toastr: ToastrService,
    private router: Router,
    private apiService: ApiService,
    private encryptionService: EncryptionService
  ) { }


  closeAllModals() {
    // Find all open modals
    const modals = document.querySelectorAll('.modal.show');

    if (modals.length === 0) return; // no modal → exit

    // Close all modals
    modals.forEach((modal) => {
      const el = modal as HTMLElement; // ✅ cast to HTMLElement
      el.classList.remove('show');
      el.style.display = 'none';
    });

    // Remove backdrops
    const backdrops = document.querySelectorAll('.modal-backdrop');
    backdrops.forEach((backdrop) => {
      const el = backdrop as HTMLElement; // cast
      el.remove();
    });

    // Remove modal-open class from body
    document.body.classList.remove('modal-open');
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
  }

  private handleActionCode(code: string, message: string) {

    switch (code) {

      case 'VAL400':
        this.toastr.warning('Please check your input and try again.', 'Invalid Data');
        break;

      case 'BAD400':
        this.toastr.error('Something is wrong with the request.', 'Bad Request');
        break;

      case 'ATH401':

        this.toastr.error('Your session has expired. Please log in again.', 'Session Expired');
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('userId');
        localStorage.removeItem('deviceId');
        if (this.router.url !== '/log-in') {
          this.closeAllModals()
          this.router.navigate(['/log-in']);

        }
        break;

      case 'FOR403':
        this.toastr.warning('You do not have permission to perform this action.', 'Access Denied');
        break;

      case 'NFD404':
        this.toastr.info('The requested item could not be found.', 'Not Found');
        break;

      case 'DUP409':
        this.toastr.warning('This record already exists.', 'Duplicate Entry');
        break;

      case 'TOO_MANY_429':
        this.toastr.error('Too many attempts! Please slow down.', 'Rate Limit Exceeded');
        break;

      case 'SRV503':
        this.toastr.error('Server is temporarily unavailable. Please try again later.', 'Service Unavailable');
        break;

      case 'SRV504':
        this.toastr.error('Server took too long to respond. Try again later.', 'Timeout');
        break;

      case 'NFA568':
        this.toastr.warning('You do not have enough balance to continue.', 'Insufficient Balance');
        break;

      case 'SRV500':
        this.toastr.error('Something went wrong on the server.', 'Server Error');
        break;

      case 'ERR':
      default:
        this.toastr.error(message || 'An unexpected error occurred.', 'Error');
        break;
    }
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
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
        
        if (error.error.errors[0].code === "UNAUTHORIZED") {
          let refreshToken = localStorage.getItem('refreshToken');
          localStorage.removeItem('token');
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('userId');
          localStorage.removeItem('deviceId');
          if (refreshToken) {
            this.apiService.refreshToken(refreshToken).subscribe((response: any) => {
              localStorage.setItem('token', response.data.accessToken);
              localStorage.setItem('refreshToken', response.data.refreshToken);
              let userId = this.encryptionService.encrypt(response.data.userId)
              localStorage.setItem('userId', userId);
              // location.reload();
            }, error => {

              this.toastr.error('Session expired. Please login again.', 'Unauthorized');
              if (this.router.url !== '/log-in') {
                this.closeAllModals()
                this.router.navigate(['/log-in']);

              }
            });
          } else {
            this.toastr.error('Session expired. Please login again.', 'Unauthorized');
            if (this.router.url !== '/log-in') {
              this.closeAllModals()
              this.router.navigate(['/log-in']);

            }
          }
        } else {
          this.handleActionCode(error.error.actionCode, error.error.message);
        }



        return throwError(() => error);
      })
    );
  }
}
