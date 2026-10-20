import { CommonModule } from '@angular/common';
import { Component, inject} from '@angular/core';
import { ToastAlertService } from '../../services/toast-alert/toast-alert.component';

export type ToastType = 'success' | 'warning' | 'danger' | 'info';

@Component({
  selector: 'app-notifications-pop',
  imports: [CommonModule],
  templateUrl: './notifications-pop.component.html',
  styleUrl: './notifications-pop.component.css',

})
export class NotificationsPopComponent {

  private readonly toastService = inject(ToastAlertService);

  toast = this.toastService.toast;

  close() {
    this.toastService.close();
  }

}
