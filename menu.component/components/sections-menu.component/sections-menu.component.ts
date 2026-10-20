import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ItemsSectionComponent } from '../items-section.component/items-section.component';

@Component({
  selector: 'app-sections-menu',
  imports: [CommonModule, ItemsSectionComponent],
  templateUrl: './sections-menu.component.html',
  styleUrl: './sections-menu.component.css',
})
export class SectionsMenuComponent {
  @Input() nameSection:string = '';
  @Input() itemsSection:any;
}
