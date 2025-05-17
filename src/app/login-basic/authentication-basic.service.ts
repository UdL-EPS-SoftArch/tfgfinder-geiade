import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { User } from './user';

@Injectable({ providedIn: 'root' })
export class AuthenticationBasicService {
  private authUrl = '/api/auth';

  constructor(private http: HttpClient) {}

  storeCurrentUser(user: User): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  logout(): void {
    localStorage.removeItem('currentUser');
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('currentUser') !== null;
  }

  getCurrentUser(): User | null {
    const data = localStorage.getItem('currentUser');
    return data ? new User(JSON.parse(data)) : null;
  }

  isRole(role: string): boolean {
    const user: User = this.getCurrentUser();
    return user && user.authorities?.[0]?.authority === 'ROLE_' + role.toUpperCase();
  }

  login(id: string, password: string): Observable<User> {
    const authHeader = 'Basic ' + btoa(`${id}:${password}`);
    return this.http.get<User>('/api/identity', {
      headers: { Authorization: authHeader }
    }).pipe(
      tap(user => {
        user.authorization = authHeader;
        this.storeCurrentUser(user);
      })
    );
  }
}
