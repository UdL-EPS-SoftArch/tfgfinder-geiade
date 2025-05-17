import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class InterestService {
  private baseUrl = '/api/interests';


  constructor(private http: HttpClient) {}


  getAllInterests(): Observable<any> {
    return this.http.get<any>(this.baseUrl);
  }


  getInterestById(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }


  getInterestsByProposalOwner(username: string): Observable<any> {
    const url = `${this.baseUrl}/search/findByProposalOwnerUsername`;
    return this.http.get(url, { params: { username } });
  }


  acceptInterest(id: string): Observable<any> {
    return this.http.patch(`${this.baseUrl}/${id}`, {
      status: 'ACCEPTED'
    });
  }


  rejectInterest(id: string): Observable<any> {
    return this.http.patch(`${this.baseUrl}/${id}`, {
      status: 'REJECTED'
    });
  }


  createInterest(interest: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, interest);
  }
}
