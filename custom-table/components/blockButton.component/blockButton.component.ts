import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-block-button',
  imports: [CommonModule],
  templateUrl: './blockButton.component.html',
  styleUrl: './blockButton.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlockButtonComponent implements OnChanges {
  @Input() isDisabled:boolean = false;
  @Input() isBlocked: any = false;


  ngOnChanges(changes: SimpleChanges) {
    if (changes['isBlocked'] && this.isBlocked) {
      this.isBlocked = changes['isBlocked'];
    }
  }

  chageStatus(){
    this.isBlocked= !this.isBlocked;
  }
}
