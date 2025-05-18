import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HateoasResourceOperation, ResourceCollection } from '@lagoshny/ngx-hateoas-client';
import {Invite} from "./invite";

@Injectable({providedIn: 'root'})
export class InviteService extends HateoasResourceOperation<Invite> {

  constructor() {
    super(Invite);
  }

  public findByIdContaining(query: string): Observable<ResourceCollection<Invite>> {
    return this.searchCollection('findByTitle', {params: {text: query}});
  }


}
/*

@Injectable({
  providedIn: 'root'
})
export class InviteService extends HateoasResourceOperation<Invite> {
  constructor(private http: HttpClient) {
    super(Invite);
  }

  public getAllInvites(): Observable<PagedResourceCollection<Invite>> {
    return this.getPage();
  }

  public getInviteById(inviteId: number): Observable<Invite> {
    return this.getResource(inviteId);
  }

  public getInviteByUrl(inviteUrl: string): Observable<Invite> {
    return this.http.get<Invite>(inviteUrl);
  }

  public findByStatus(status: string): Observable<ResourceCollection<Invite>> {
    return this.searchCollection('findByStatus', { params: { status } });
  }

  public findByWho(user: User): Observable<ResourceCollection<Invite>> {
    return this.searchCollection('findByWho', { params: { who: user } });
  }

  public findByWhat(proposal: Proposal): Observable<ResourceCollection<Invite>> {
    return this.searchCollection('findByWhat', { params: { what: proposal } });
  }

  public findByWhoAndWhat(user: User, proposal: Proposal): Observable<Invite> {
    return this.searchResource('findByWhoAndWhat', { params: { who: user, what: proposal } });
  }

  public isInviteReceivedByUser(user: User, invite: Invite): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      let isReceived = false;

      this.findByWho(user).subscribe({
        next: (invites: ResourceCollection<Invite>) => {
          if (invites && Array.isArray(invites.resources)) {
            for (const i of invites.resources) {
              if (i.getIdFromLinks() === invite.id.toString()) {
                isReceived = true;
                break;
              }
            }
          }
          observer.next(isReceived);
          observer.complete();
        },
        error: (err) => {
          console.error('Error checking if invite was received:', err);
          observer.next(false);
          observer.complete();
        }
      });
    });
  }

}
*/
