import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { KioscoSummaryData } from '../interfaces/kiosco-summary.interface';

const INITIAL_SUMMARY: KioscoSummaryData = {
  pendingRequestsCount: 0,
  metrics: [
    {
      key: 'carga',
      icon: 'payments',
      title: 'Carga de efectivo',
      mode: 'split',
      left: { count: 0, level: 'atencion', label: 'kioscos' },
      right: { count: 0, level: 'urgente', label: 'kioscos' },
    },
    {
      key: 'retiro',
      icon: 'account_balance_wallet',
      title: 'Retiro de efectivo',
      mode: 'split',
      left: { count: 0, level: 'atencion', label: 'kioscos' },
      right: { count: 0, level: 'urgente', label: 'kioscos' },
    },
    {
      key: 'sims',
      icon: 'sim_card',
      title: 'Carga de SIMs',
      mode: 'split',
      left: { count: 0, level: 'atencion', label: 'kioscos' },
      right: { count: 0, level: 'urgente', label: 'kioscos' },
    },
    {
      key: 'esim',
      icon: 'memory',
      title: 'Stock eSIM',
      mode: 'single',
      single: { count: 0, level: 'urgente', label: '' },
    },
  ],
};

@Injectable({
  providedIn: 'root',
})
export class KioscoSummaryService {
  getSummary(): Observable<KioscoSummaryData> {
    return of(INITIAL_SUMMARY);
  }
}
