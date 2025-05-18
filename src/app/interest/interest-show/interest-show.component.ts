import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InterestService } from '../interest.service';
import { Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthenticationBasicService } from '../../login-basic/authentication-basic.service';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-interest-show',
  templateUrl: './interest-show.component.html',
  styleUrls: ['./interest-show.component.css'],
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule
  ]
})
export class InterestShowComponent implements OnInit {

  
  interests: any[] = [];
  isLoading = false;
  loadError: string | null = null;


  constructor(
    private interestService: InterestService,
    private authService: AuthenticationBasicService,
    private httpClient: HttpClient
  ) {}


  ngOnInit(): void {
    this.getInterests();
  }


  /**
   * 
   * Get all interests from the service and process them.
   * This method is called when the component is initialized.
   * It fetches the interests from the server and processes them to display in the component.
   * 
   */
  getInterests(): void {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) {
      this.handleError('User not logged in');
      return;
    }

    this.isLoading = true;
    this.interestService.getAllInterests().subscribe({
      next: data => this.processInterests(data, currentUser.username),
      error: () => this.handleError('Error fetching interests')
    });
  }


  private async processInterests(response: any, username: string): Promise<void> {
    const interestsList = response?._embedded?.interests || [];
    if (interestsList.length === 0) {
      this.finishLoading([]);
      return;
    }

    let pendingRequests = interestsList.length;
    const filteredInterests: any[] = [];

    // iterate over the interests
    for (const interest of interestsList) {
      try {
        const proposalUrl = interest._links.what.href;
        const requesterUrl = interest._links.who.href;

        // Load independent entities in parallel
        const [proposal, requester] = await Promise.all([
          this.loadEntity(proposalUrl),
          this.loadEntity(requesterUrl)
        ]);

        const proposalOwner = await this.loadEntity(proposal._links.owner.href);

        if (proposalOwner.username === username) {
          filteredInterests.push({
            ...interest,
            what: proposal,
            who: requester,
            id: this.extractId(interest._links.self.href)
          });
        }
      } catch (error) {
        console.error('Error procesando interés:', error);
      } finally {
        pendingRequests--;
        if (pendingRequests === 0) {
          this.finishLoading(filteredInterests);
        }
      }
    }
  }


  private loadEntity(url: string): Promise<any> {
    return this.httpClient.get<any>(url).toPromise();
  }


  private extractId(link: string): string {
    return link.substring(link.lastIndexOf('/') + 1);
  }


  private finishLoading(data: any[]): void {
    this.interests = data;
    this.isLoading = false;
  }


  private handleError(message: string): void {
    this.loadError = message;
    this.isLoading = false;
  }


  private handlePartialError(pending: number, accumulated: any[]): void {
    if (pending === 0) this.finishLoading(accumulated);
  }


}