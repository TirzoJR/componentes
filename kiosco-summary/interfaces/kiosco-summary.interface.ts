export type SummaryMetricKey = 'carga' | 'retiro' | 'sims' | 'esim';
export type SummaryLevel = 'atencion' | 'urgente' | 'suficiente';

export interface SummaryLevelStat {
  count: number;
  level: SummaryLevel;
  label: string; 
}

export interface SummaryMetricCard {
  key: SummaryMetricKey;
  icon: string;
  title: string;
  mode: 'split' | 'single';
  left?: SummaryLevelStat; 
  right?: SummaryLevelStat; 
  single?: SummaryLevelStat;
}

export interface KioscoSummaryData {
  pendingRequestsCount: number;
  metrics: SummaryMetricCard[];
}

export interface SummaryFilterEvent {
  metric: SummaryMetricKey;
  level?: SummaryLevel;
}