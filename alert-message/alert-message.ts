import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Icon } from "../icon/icon";

@Component({
  selector: 'app-alert-message',
  imports: [CommonModule, Icon],
  templateUrl: './alert-message.html',
  styleUrl: './alert-message.css',
})
export class AlertMessage {
  @Input() message = '';
  @Input() title = '';
  @Input() variant: 'warning' | 'error' | 'success' = 'error';
}
