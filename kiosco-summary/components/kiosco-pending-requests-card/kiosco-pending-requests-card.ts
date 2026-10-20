import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { Icon } from '../../../icon/icon';

@Component({
  selector: 'app-kiosco-pending-requests-card',
  imports: [CommonModule, Icon],
  templateUrl: './kiosco-pending-requests-card.html',
  styleUrl: './kiosco-pending-requests-card.css',
})
export class KioscoPendingRequestsCard {
  count = input.required<number>();

  viewRequests = output<void>();

  onClick() {
    this.viewRequests.emit();
  }
}
