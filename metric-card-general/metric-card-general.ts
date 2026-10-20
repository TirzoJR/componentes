import { CommonModule } from '@angular/common';
import { Component, computed, input, output } from '@angular/core';
import { CardStatus, CardVariant } from './Interface/metric-card-interface';

@Component({
  selector: 'app-metric-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './metric-card-general.html',
})
export class MetricCardComponent {
  variant = input<CardVariant>('simple');
  title = input.required<string>();
  value = input.required<number | string>();
  description = input<string>('');

  status = input<CardStatus>();
  actionButtonLabel = input<string>();

  actionClick = output<void>();

  statusClasses = computed(() => {
    const currentStatus = this.status();
    if (!currentStatus) return '';

    switch (currentStatus.type) {
      case 'success':
        return 'bg-[#e3f6ea] text-[#16924f] border-[#e3f6ea]';
      case 'warning':
        return 'bg-[#fdedd9] text-[#c9750f] border-[#fdedd9]';
      case 'error':
        return 'bg-[#fbe7e6] text-[#d64b3f] border-[#fbe7e6]';
      case 'info':
      default:
        return 'bg-[#eef0f2] text-[#6b7280] border-[#eef0f2]';
    }
  });

  onAction() {
    this.actionClick.emit();
  }
}
