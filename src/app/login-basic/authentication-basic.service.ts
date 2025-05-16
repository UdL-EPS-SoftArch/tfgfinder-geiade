import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { User } from './user';

@Injectable({ providedIn: 'root' })
export class AuthenticationBasicService {
  private authUrl = '/api/auth'; // Ajusta según tu API backend

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
    return user && user.authorities[0] && user.authorities[0].authority === 'ROLE_' + role.toUpperCase();
  }

  registerStudent(data: any): Observable<any> {
    return this.http.post(`${this.authUrl}/register-student`, data).pipe(
      tap(() => this.login(data.username, data.password).subscribe())
    );
  }

  registerProfessor(data: any): Observable<any> {
    return this.http.post(`${this.authUrl}/register-professor`, data).pipe(
      tap(() => this.login(data.username, data.password).subscribe())
    );
  }

  registerOrganisation(data: any): Observable<any> {
    return this.http.post(`${this.authUrl}/register-organisation`, data);
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.authUrl}/login`, { username, password }).pipe(
      tap((user: any) => this.storeCurrentUser(user))
    );
  }
}
