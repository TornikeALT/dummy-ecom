import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  username: string;
  firstName: string;
  lastName: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'https://dummyjson.com/auth/login';
  private authTokenSubject = new BehaviorSubject<string | null>(null);
  private userSubject = new BehaviorSubject<AuthResponse | null>(null);

  authToken$ = this.authTokenSubject.asObservable();
  user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(this.baseUrl, { username, password })
      .pipe(
        tap((response) => {
          localStorage.setItem('authToken', response.accessToken);
          localStorage.setItem('user', JSON.stringify(response));
          this.authTokenSubject.next(response.accessToken);
          this.userSubject.next(response);
        })
      );
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    this.authTokenSubject.next(null);
    this.userSubject.next(null);
    this.router.navigate(['/']);
  }
  getProfile() {
    const token = this.getToken();
    if (!token) {
      console.error('No auth token found!');
      return;
    }
    return this.http.get('https://dummyjson.com/auth/me', {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
  getUser(): AuthResponse | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
}
