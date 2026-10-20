import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Icon } from '../icon/icon';

@Component({
  selector: 'app-button-custom',
  imports: [CommonModule, Icon],
  templateUrl: './button-custom.html',
  styleUrl: './button-custom.css',
})
export class ButtonCustom {
  @Input() text = '';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() isDisabled: boolean = false;
  @Input() variant: 'primary' | 'secondary' | 'secondary-sn-border' | 'icon-only' | 'icon-danger' = 'primary';
  @Input() size: 'sm' | 'md' = 'md';
  @Input() isFull = false;
  @Input() icon: string = '';
  @Input() iconPosition: 'left' | 'right' = 'left';
  @Input() iconClass = 'text-[#6B7280]';
  @Input() imageSrc: string = '';
  @Input() imageClass: string = 'w-4 h-4 object-contain';
  @Input() ariaLabel = '';

  get buttonClasses(): string {
    if (this.variant === 'icon-only') {
      return 'relative group grid size-9 place-items-center rounded-xl border transition-base border-line-strong bg-surface hover:border-primary/40 hover:bg-app';
    }

    if (this.variant === 'icon-danger') {
      return 'relative group grid size-9 place-items-center rounded-xl border transition-base border-line-strong bg-surface hover:border-danger/40 hover:bg-tint-danger';
    }

    let classes =
      'flex items-center justify-center gap-2 transition-colors outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 ';

    if (this.size === 'sm') {
      classes += 'py-1.5 px-3 text-xs h-8 rounded-lg font-medium ';
    } else {
      classes += 'py-[10px] px-[16px] text-sm h-[42px] rounded-xl font-bold ';
    }

    classes += this.isFull ? 'w-full ' : 'w-fit ';

    classes += this.variant;

    return classes;
  }
}
