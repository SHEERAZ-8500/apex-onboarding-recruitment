import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ThemeService } from '../../../shared/services/Theme.service';

@Component({
  selector: 'app-reset-pages',
  templateUrl: './reset-pages.component.html',
  styleUrl: './reset-pages.component.scss'
})
export class ResetPagesComponent implements OnInit, OnDestroy {
  
  private destroy$ = new Subject<void>();
  isLightTheme: boolean = false;
  
  otpConfig = {
    length: 5,
    allowNumbersOnly: true,
    inputClass: 'otp-input',
    containerClass: 'otp-input-wrapper'
  };

  otp: string = '';

  constructor(private themeService: ThemeService) {}

  ngOnInit() {
    // Subscribe to theme changes
    this.themeService.isLightTheme$
      .pipe(takeUntil(this.destroy$))
      .subscribe(isLight => {
        this.isLightTheme = isLight;
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
}
