import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-counter-elements',
  imports: [CommonModule],
  templateUrl: './counter-elements.component.html',
  styleUrl: './counter-elements.component.css',

})
export class CounterElementsComponent {
  @Input() numItems:number = 0;
  @Input() isSelected:boolean = false;
  
}
