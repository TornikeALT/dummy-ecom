import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  user: any = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getProfile()?.subscribe({
      next: (response) => {
        console.log('User Profile', response);
        this.user = response;
      },
      error: (error) => {
        console.error('Error fetching profile', error);
      },
    });
  }
}
