import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-component',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit{
  private readonly _router = inject(Router);
  private readonly platformId = inject(PLATFORM_ID);

  userName: string = 'Usuario';
  roleName: string = 'Operador';

  ngOnInit() {
    if (!isPlatformBrowser(this.platformId)) return;

    const auth = localStorage.getItem('auth');
    if (auth) {
      const { user } = JSON.parse(auth);
      this.userName = user.name;
      this.roleName = user.roles === 'ROLE_OPERATOR' ? 'Operador' : 'Administrador';
    }
  }

  closeSession() {
    localStorage.removeItem('auth');
    this._router.navigate(['/login']);
  }
}
