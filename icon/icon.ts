import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-icon',
  imports: [CommonModule],
  templateUrl: './icon.html',
  styleUrl: './icon.css',
})
export class Icon {
  @Input() iconName: string = '';
  @Input() size: 'xs' | 'sm' | 'base' | 'lg' | 'xl' = 'base';
  @Input() iconColor: string = 'text-current';
}

