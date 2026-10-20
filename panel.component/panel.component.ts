import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header.component/header.component';
import { MenuComponent } from '../menu.component/menu.component';
import { UsersService } from '../../../pages/users/services/list-users.service';

@Component({
  selector: 'app-panel-component',
  imports: [CommonModule, RouterOutlet, HeaderComponent, MenuComponent],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.css',
})
export class PanelComponent {

  private readonly _usersService = inject(UsersService);
  isOperator = signal(false);

}
