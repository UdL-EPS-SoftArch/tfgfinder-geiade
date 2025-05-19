import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

import { InterestService } from '../interest.service';
import { AuthenticationBasicService } from '../../login-basic/authentication-basic.service';

@Component({
  selector: 'app-interest-show',
  templateUrl: './interest-show.component.html',
  styleUrls: ['./interest-show.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class InterestShowComponent implements OnInit {
  /**
   * Array of interests where each item contains:
   * - proposal: the related proposal data (or null if unavailable)
   * - requester: the user who requested the interest
   * - id: the interest identifier
   */
  public interests: Array<{ proposal: any | null; requester: any; id: string }> = [];

  /** Indicates whether data is currently loading */
  public isLoading = false;

  /** Holds an error message if loading fails */
  public loadError: string | null = null;

  constructor(
    private interestService: InterestService,
    private authService: AuthenticationBasicService,
    private httpClient: HttpClient
  ) {}

  /**
   * Lifecycle hook: called after component initialization
   */
  ngOnInit(): void {
    this.loadInterests();
  }

  /**
   * Initiates fetching all interests for the current user
   */
  private loadInterests(): void {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) {
      this.handleError('User not authenticated');
      return;
    }

    this.isLoading = true;
    this.interestService.getAllInterests().subscribe({
      next: response => this.processInterests(response, currentUser.username),
      error: () => this.handleError('Failed to fetch interests')
    });
  }

  /**
   * Processes the HAL response of interests, fetching related entities
   * and filtering by those owned by the current user
   */
  private processInterests(response: any, username: string): void {
    const interestArray = response?._embedded?.interests || [];
    if (interestArray.length === 0) {
      this.finishLoading([]);
      return;
    }

    let pendingRequests = interestArray.length;
    const filtered: Array<{ proposal: any | null; requester: any; id: string }> = [];

    interestArray.forEach(interest => {
      const proposalUrl = interest._links.what?.href;
      const requesterUrl = interest._links.who?.href;

      this.fetchEntity(proposalUrl)
        .then(proposal => {
          if (!proposal) {
            // Skip entries without a valid proposal
            if (--pendingRequests === 0) this.finishLoading(filtered);
            return;
          }

          const ownerUrl = proposal._links?.owner?.href;
          this.fetchEntity(ownerUrl)
            .then(owner => {
              this.fetchEntity(requesterUrl)
                .then(requester => {
                  if (owner?.username === username) {
                    filtered.push({
                      proposal,
                      requester,
                      id: this.extractId(interest._links.self.href)
                    });
                  }

                  if (--pendingRequests === 0) this.finishLoading(filtered);
                })
                .catch(() => this.handlePartialError(--pendingRequests, filtered));
            })
            .catch(() => this.handlePartialError(--pendingRequests, filtered));
        })
        .catch(() => this.handlePartialError(--pendingRequests, filtered));
    });
  }

  /**
   * Fetches an entity from a given URL, returning null on failure
   */
  private fetchEntity(url: string | undefined): Promise<any | null> {
    if (!url) {
      return Promise.resolve(null);
    }

    return firstValueFrom(this.httpClient.get<any>(url))
      .catch(error => {
        console.error('Error fetching entity:', url, error);
        return null;
      });
  }

  /**
   * Extracts the ID segment from a HAL self link
   */
  private extractId(link: string): string {
    return link.substring(link.lastIndexOf('/') + 1);
  }

  /**
   * Finalizes loading by setting the displayed interests
   */
  private finishLoading(data: any[]): void {
    this.interests = data;
    this.isLoading = false;
  }

  /**
   * Handles a fatal error by showing a message
   */
  private handleError(message: string): void {
    this.loadError = message;
    this.isLoading = false;
  }

  /**
   * Handles partial errors and finishes when all requests are done
   */
  private handlePartialError(pending: number, accumulated: any[]): void {
    if (pending === 0) {
      this.finishLoading(accumulated);
    }
  }
}
