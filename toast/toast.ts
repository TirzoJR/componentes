import { CommonModule } from '@angular/common';
import { Component, computed, inject, input } from '@angular/core';
import { Icon } from '../icon/icon';
import { ToastService } from '../../services/toast/toast.service';
import { ToastPosition, ToastType } from '../../interfaces/toast.interface';

const POSITION_CLASS: Record<ToastPosition, string> = {
  'top-left': 'fixed top-6 left-6 items-start',
  'top-center': 'fixed top-6 left-1/2 -translate-x-1/2 items-center',
  'top-right': 'fixed top-6 right-6 items-end',
  'bottom-left': 'fixed bottom-6 left-6 items-start',
  'bottom-center': 'fixed bottom-6 left-1/2 -translate-x-1/2 items-center',
  'bottom-right': 'fixed bottom-6 right-6 items-end',
};

@Component({
  selector: 'app-toast',
  imports: [CommonModule, Icon],
  templateUrl: './toast.html',
  styleUrl: './toast.css',
})
export class Toast {
 private readonly _toastService = inject(ToastService);

  zone = input<string>('global');

  fixed = input<boolean>(true);

  position = input<ToastPosition>('top-center');

  allToasts = this._toastService.toasts;

  toasts = computed(() =>
    this.allToasts().filter((t) => t.zone === this.zone()),
  );

  containerClass = computed(() => {
    if (!this.fixed()) {
      return 'flex flex-col items-center gap-3 w-full';
    }
    return `${POSITION_CLASS[this.position()]} z-[9999] flex flex-col gap-3 pointer-events-none w-full px-4`;
  });

  iconTypes: Record<ToastType, string> = {
    [ToastType.success]: 'check_circle',
    [ToastType.error]: 'cancel',
  };

  toastTypeClass: Record<ToastType, string> = {
    [ToastType.success]: 'toast-success',
    [ToastType.error]: 'toast-error',
  };

  close(id: string) {
    this._toastService.dismiss(id);
  }
}
