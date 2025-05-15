import { Component, OnInit } from '@angular/core';
import { ExternalService } from '../../external/external-service';
import { External } from '../../external/external';

@Component({
  selector: 'app-external-list',
  templateUrl: './external-list.component.html'
})
export class ExternalListComponent implements OnInit {
  externals: External[] = [];

  constructor(private externalService: ExternalService) {}

  ngOnInit() {
    this.externalService.getCollection().subscribe(all => {
      this.externals = all.resources.filter(e => e.status === 'pending');
    });
  }

  approve(external: External) {
    external.status = 'approved';
    this.externalService.updateResource(external).subscribe();
  }

  reject(external: External) {
    external.status = 'rejected';
    this.externalService.updateResource(external).subscribe();
  }
}
