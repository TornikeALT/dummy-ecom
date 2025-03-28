import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormsModule, CommonModule],
})
export class LoginComponent implements OnInit {
  username = '';
  password = '';
  errorMsg = null;

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    this.authService.login(this.username, this.password).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (error) => {
        this.errorMsg =
          error.error.message || 'Login failed. Please try again.';
      },
    });
  }
  logout() {
    this.authService.logout();
  }
  onInputChange() {
    this.errorMsg = null;
  }
  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/']);
    }
  }
}
