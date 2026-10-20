import { CommonModule } from '@angular/common';
import { Component, Input, output} from '@angular/core';
import { ButtonCustom } from '../button-custom/button-custom';

@Component({
  selector: 'app-container-modal',
  imports: [CommonModule, ButtonCustom],
  templateUrl: './container-modal.component.html',
  styleUrl: './container-modal.component.css',
})
export class ContainerModalComponent {
  @Input() titleForm:string = '';
  @Input() textCloseButton:string = '';
  @Input() textConfirmButton:string = '';
  @Input() cancelButton:boolean = true;
  @Input() isConfirmDisabled: boolean = false;
  @Input() size: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' = 'lg';
  closeM = output();
  sendM = output();


  closeModal(){
    this.closeM.emit();
  }

  sendInformation(){
    this.sendM.emit();
  }

  get maxWidthClass(): string {
    const sizeMap: Record<string, string> = {
      'sm': 'sm:max-w-sm',
      'md': 'sm:max-w-md',
      'lg': 'sm:max-w-lg',
      'xl': 'sm:max-w-xl',
      '2xl': 'sm:max-w-2xl',
      '3xl': 'sm:max-w-3xl',
      '4xl': 'sm:max-w-4xl',
      '5xl': 'sm:max-w-5xl'
    };
    return sizeMap[this.size] || 'sm:max-w-lg';
  }
}
