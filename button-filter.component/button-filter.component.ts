import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { DataFilterButton } from '../../interfaces/recibe.interface';
import { CounterElementsComponent } from "../counter-elements.component/counter-elements.component";

@Component({
  selector: 'app-button-filter',
  imports: [CommonModule, CounterElementsComponent],
  templateUrl: './button-filter.component.html',
  styleUrl: './button-filter.component.css',

})
export class ButtonFilterComponent {
  @Input() infoElement!: DataFilterButton;
  @Input() isPressed : boolean = false;
  @Input() needCounter : boolean = false;

  changeStatus(){
    this.isPressed = true;
  }


}
