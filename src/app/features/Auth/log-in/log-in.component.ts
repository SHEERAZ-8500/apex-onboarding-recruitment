import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.scss'
})
export class LogInComponent {
    constructor(private router: Router) {}
  onLogin() {
    this.loading = true
    console.log('Login button clicked');
    setTimeout(() => {
      this.loading = false;
      this.router.navigate(['/panel']);
    }, 2000);
 
  }

  loading = false;

  showPassword = false;

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}
