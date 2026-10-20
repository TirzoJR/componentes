import { CommonModule } from '@angular/common';
import { Component, input, TemplateRef } from '@angular/core';

@Component({
  selector: 'o-button, app-o-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './o-button.html',
  styleUrl: './o-button.scss',
})
export class ButtonComponent {
  text = input<string>('');
  typeButton = input<'button' | 'submit' | 'reset'>('button');
  type = input<'basic' | 'rounded' | 'outline'>('basic');
  styled = input<'primary' | 'secondary' | 'danger' | 'ghost' | 'unselect'>('primary');
  iconLeft = input<TemplateRef<any> | null>(null);
  iconRight = input<TemplateRef<any> | null>(null);
  disabled = input<boolean>(false);
  isLoading = input<boolean>(false);
}
