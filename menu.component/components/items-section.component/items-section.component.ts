import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: 'app-items-section',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './items-section.component.html',
  styleUrl: './items-section.component.css',
})
export class ItemsSectionComponent {
  @Input() dataSection:any;

}
