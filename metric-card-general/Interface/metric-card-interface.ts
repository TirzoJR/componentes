export type CardVariant = 'simple' | 'detailed';
export type StatusType = 'success' | 'warning' | 'error' | 'info';

export interface CardStatus {
  label: string;
  type: StatusType;
}