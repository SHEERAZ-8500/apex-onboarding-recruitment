import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ThemeService } from '../../../shared/services/Theme.service';
import { ApiService } from '../../../shared/services/apis/api.service';
import { ToastrService } from 'ngx-toastr';
import { EncryptionService } from '../../../shared/services/encryption.service';

@Component({
  selector: 'app-reset-pages',
  templateUrl: './reset-pages.component.html',
  styleUrl: './reset-pages.component.scss'
})
export class ResetPagesComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject<void>();
  isLightTheme: boolean = false;
  currentView: 'email' | 'otp' | 'create-password' | 'verify-otp' = 'email';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  token: string | null = ''
  otpConfig = {
    length: 6,
    allowNumbersOnly: true,
    inputClass: 'otp-input',
    containerClass: 'otp-input-wrapper'
  };

  otp: string = '';

  constructor(
    private themeService: ThemeService,
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private toastr: ToastrService,
    private encryptionService: EncryptionService
  ) { }

  ngOnInit() {
    // Subscribe to theme changes
    this.themeService.isLightTheme$
      .pipe(takeUntil(this.destroy$))
      .subscribe(isLight => {
        this.isLightTheme = isLight;
      });

    // Check route to determine view
    this.route.url.pipe(takeUntil(this.destroy$)).subscribe(segments => {
      const path = segments[0]?.path;
      if (path === 'otp-reset') {
        this.currentView = 'otp';
      } else if (path === 'create-password') {
        this.currentView = 'create-password';
      } else if (path === 'verify-otp') {
        this.currentView = 'verify-otp';
        this.token = this.route.snapshot.paramMap.get('token');

      } else {
        this.currentView = 'email';
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onOtpChange(otp: string) {
    this.otp = otp;
    console.log('OTP Changed:', otp);
  }

  verifyOtp() {
    if (this.currentView === 'verify-otp') {
      let preAuthToken = this.encryptionService.decrypt(this.token || '');
      this.apiService.verifyOtp({ preAuthToken: preAuthToken, otp: this.otp }).subscribe({
        next: (response: any) => {
          
          let data = response.body.data
          this.toastr.success('OTP verified successfully!');
          this.toastr.success('Login successful!');
          let userId = this.encryptionService.encrypt(data.userId)
          localStorage.setItem('userId', userId);
          localStorage.setItem('token', data.accessToken);
          let deviceId = this.encryptionService.encrypt(response.headers.get('x-device-id') || '');
          localStorage.setItem('deviceId', deviceId);
          localStorage.setItem('refreshToken', data.refreshToken);
          this.router.navigate(['/panel/dashboard']);
        },
        error: (error) => {
          this.toastr.error(error.error.message || 'OTP verification failed. Please try again.');
        }
      });
      return;
    }
    if (this.otp.length === 5) {
      console.log('Verifying OTP:', this.otp);
      // Add your verification logic here
    } else {
      console.log('Please enter complete OTP');
    }
  }

  resendOtp() {
    console.log('Resending OTP...');
    // Add your resend logic here
  }

  sendResetEmail() {
    if (this.email) {
      console.log('Sending reset email to:', this.email);
      // Add your email sending logic here
      // After successful email send, navigate to OTP page
      // this.router.navigate(['/auth/otp-reset']);
    } else {
      console.log('Please enter email');
    }
  }

  createNewPassword() {
    if (!this.password) {
      console.log('Please enter password');
      return;
    }

    if (this.password !== this.confirmPassword) {
      console.log('Passwords do not match');
      return;
    }

    if (this.password.length < 8) {
      console.log('Password must be at least 8 characters');
      return;
    }

    console.log('Creating new password...');
    // Add your password reset logic here
    // After successful password reset, navigate to login
    // this.router.navigate(['/auth']);
  }
}
