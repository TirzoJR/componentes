import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { Icon } from '../../../icon/icon';
import {
  SummaryFilterEvent,
  SummaryLevel,
  SummaryLevelStat,
  SummaryMetricCard,
} from '../../interfaces/kiosco-summary.interface';

@Component({
  selector: 'app-kiosco-summary-stat-card',
  imports: [CommonModule, Icon],
  templateUrl: './kiosco-summary-stat-card.html',
  styleUrl: './kiosco-summary-stat-card.css',
})
export class KioscoSummaryStatCard {
  card = input.required<SummaryMetricCard>();

  filterSelect = output<SummaryFilterEvent>();

  private readonly levelLabels: Record<SummaryLevel, string> = {
    atencion: 'Atención',
    urgente: 'Urgente',
    suficiente: 'Suficiente',
  };

  private readonly levelBadgeClass: Record<SummaryLevel, string> = {
    atencion: 'bg-[#fdedd9] text-[#c9750f]',
    urgente: 'bg-[#fbe7e6] text-[#d64b3f]',
    suficiente: 'bg-[#e3f6ea] text-[#16924f]',
  };

  displayValue(stat: SummaryLevelStat): string {
    if (stat.count === 0) return 'Ninguno';
    return `${stat.count} ${stat.label}`;
  }

  levelLabel(stat: SummaryLevelStat): string {
    return this.levelLabels[stat.level];
  }

  badgeClass(stat: SummaryLevelStat): string {
    if (stat.count === 0) return 'bg-[#eef0f2] text-[#6b7280]';
    return this.levelBadgeClass[stat.level];
  }

  valueClass(stat: SummaryLevelStat): string {
    if (stat.count === 0) return 'text-gray-400';
    if (stat.level === 'urgente') return 'text-[#d64b3f]';
    return 'text-gray-900';
  }

  onSideClick(stat: SummaryLevelStat) {
    this.filterSelect.emit({ metric: this.card().key, level: stat.level });
  }

  onViewAll(event: MouseEvent) {
    event.stopPropagation();
    this.filterSelect.emit({ metric: this.card().key });
  }
}
