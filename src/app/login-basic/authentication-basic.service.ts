// authentication-basic.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from './user';

@Injectable({ providedIn: 'root' })
export class AuthenticationBasicService {
  private authUrl = '/api/auth';
  private currentUserSubject = new BehaviorSubject<User | null>(this.loadFromStorage());

  constructor(private http: HttpClient) {}

  private loadFromStorage(): User | null {
    const data = localStorage.getItem('currentUser');
    return data ? new User(JSON.parse(data)) : null;
  }

  get currentUser$(): Observable<User | null> {
    return this.currentUserSubject.asObservable();
  }

  storeCurrentUser(user: User): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }


  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  isLoggedIn(): boolean {
    return this.currentUserSubject.value !== null;
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  login(id: string, password: string): Observable<User> {
    const authHeader = 'Basic ' + btoa(`${id}:${password}`);
    return this.http.get<User>('/api/identity', {
      headers: { Authorization: authHeader }
    }).pipe(
      tap(user => {
        user.authorization = authHeader;
        if (user.id) {
          this.storeCurrentUser(user);
        }
      })
    );
  }

  isRole(role: string): boolean {
    const user = this.getCurrentUser();
    return user?.authorities?.[0]?.authority === `ROLE_${role.toUpperCase()}`;
  }
}
