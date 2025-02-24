import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';
  isAuthenticated = signal<boolean>(false);

  constructor(private router: Router) {
    this.isAuthenticated.set(this.getToken() !== null);
  }

  login(username: string, password: string): boolean {
    if (username === 'admin@admin.com' && password === '1234') {
      localStorage.setItem(this.TOKEN_KEY, 'token_de_ejemplo');
      this.isAuthenticated.set(true);
      this.router.navigate(['/dashboard']);
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this.isAuthenticated.set(false);
    this.router.navigate(['/login']);
  }

  private getToken(): string | null {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem('token');
    }
    return null;
  }
}
