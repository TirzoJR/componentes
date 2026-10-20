import { Component, inject, input, output } from '@angular/core';
import { Router } from '@angular/router';
import { KioscoSummaryData, SummaryFilterEvent } from './interfaces/kiosco-summary.interface';
import { KioscoPendingRequestsCard } from './components/kiosco-pending-requests-card/kiosco-pending-requests-card';
import { KioscoSummaryStatCard } from './components/kiosco-summary-stat-card/kiosco-summary-stat-card';

@Component({
  selector: 'app-kiosco-card-summary',
  imports: [KioscoPendingRequestsCard, KioscoSummaryStatCard],
  templateUrl: './kiosco-card-summary.html',
  styleUrl: './kiosco-card-summary.css',
})
export class KioscoCardSummary {
  private readonly router = inject(Router);

  summary = input.required<KioscoSummaryData>();
  filterSelect = output<SummaryFilterEvent>();

  onFilterSelect(event: SummaryFilterEvent) {
    this.filterSelect.emit(event);
  }

  onViewRequests() {
    this.router.navigateByUrl('/solicitudes');
  }
}
