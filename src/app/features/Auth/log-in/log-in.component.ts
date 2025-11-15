import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../shared/services/apis/api.service';
import { ToastrService } from 'ngx-toastr';
import { EncryptionService } from '../../../shared/services/encryption.service';
@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.scss'
})
export class LogInComponent {
  constructor(private router: Router, private apiService: ApiService, private toaster: ToastrService, private encryptionService: EncryptionService) { }
  email: string = '';
  password: string = '';
  onLogin() {

    if (!this.email || !this.password) {
      this.toaster.error('Please fill in all required fields.');
      return
    }
    this.loading = true

    this.apiService.logIn({ email: this.email, password: this.password }).subscribe({
      next: (response: any) => {
        this.loading = false;
        this.toaster.success('Login successful!');
        let userId = this.encryptionService.encrypt(response.data.userId)
        localStorage.setItem('userId', userId);
        localStorage.setItem('token', response.data.accessToken);
        
        localStorage.setItem('refreshToken', response.data.refreshToken);
        // this.router.navigate(['/panel/dashboard']);
        this.router.navigate(['/panel/dashboard']);
      },
      error: (error) => {
        this.loading = false;
        this.toaster.error('Login failed. Please check your credentials and try again.');
      }
    });

  }

  loading = false;

  showPassword = false;

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}
