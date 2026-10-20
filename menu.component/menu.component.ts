import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, HostListener, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { SectionsMenuComponent } from './components/sections-menu.component/sections-menu.component';
import { AUTH_ICONS } from '../../constants/icons.constants';

@Component({
  selector: 'app-menu-component',
  imports: [CommonModule, SectionsMenuComponent, RouterLink],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
})
export class MenuComponent implements OnInit {
  private readonly _router = inject(Router);
  private readonly platformId = inject(PLATFORM_ID);
  logoIcon = AUTH_ICONS.LOGO;
  isHidden = signal(false);
  isMobile = signal(false);
  user: any;
  roleSelected: string = '';
  initialsName: string = '';

  optionsMenu: any[] = [];

  rawMenu = [
    {
      nameSection: 'OPERACIÓN',
      items: [
        {
          id: 'dashboard',
          name: 'Dashboard',
          route: '/admin-kioscos/dashboard',
          icon: AUTH_ICONS.DASHSBOARD,
        },
        {
          id: 'kioscos',
          name: 'Kioscos',
          route: '/admin-kioscos/listado-kioscos',
          icon: AUTH_ICONS.KIOSKO,
        },
      ],
    },
    {
      nameSection: 'EFECTIVO',
      items: [
        {
          id: 'solicitudes',
          name: 'Solicitudes',
          route: '/admin-kioscos/so',
          icon: AUTH_ICONS.SOLICITUDES,
        },
        {
          id: 'movimientos',
          name: 'Movimientos',
          route: '/admin-kioscos/movimientos',
          icon: AUTH_ICONS.MOVIMIENTOS,
        },
      ],
    },
    {
      nameSection: 'CATÁLOGOS',
      items: [
        {
          id: 'lotes',
          name: 'Lotes SIM/eSIM',
          route: '/admin-kioscos/lotes-sim-esim',
          icon: AUTH_ICONS.LOTES,
        },
        {
          id: 'inventario',
          name: 'Inventario',
          route: '/admin-kioscos/inventario',
          icon: AUTH_ICONS.INVENTARIO,
        },
        {
          id: 'ofertas',
          name: 'Ofertas',
          route: '/admin-kioscos/lista-ofertas',
          icon: AUTH_ICONS.OFERTAS,
        },
      ],
    },
    {
      nameSection: 'ADMINISTRACIÓN',
      items: [
        {
          id: 'usuarios',
          name: 'Usuarios',
          route: '/admin-kioscos/usuarios',
          icon: AUTH_ICONS.USUARIOS,
        },
        {
          id: 'configuracion',
          name: 'Configuración',
          route: '/admin-kioscos/configuracion',
          icon: AUTH_ICONS.CONFIG,
        },
      ],
    },
  ];

  ngOnInit() {
    if (!isPlatformBrowser(this.platformId)) return;

    const auth = localStorage.getItem('auth');

    if (auth) {
      const { user } = JSON.parse(auth);
      this.user = user;
      this.textRole(user.roles);
      this.getInitials(user.username);

      this.buildMenuByRole(user.roles);
    }
  }

  buildMenuByRole(role: string) {
    let menuToRender = JSON.parse(JSON.stringify(this.rawMenu));

    if (role === 'ROLE_ADMIN') {
      menuToRender = menuToRender
        .map((section: any) => {
          section.items = section.items.filter((item: any) => item.id !== 'usuarios');
          return section;
        })
        .filter((section: any) => section.items.length > 0);
    }

    this.optionsMenu = menuToRender;
  }

  textRole(role: string) {
    switch (role) {
      case 'ROLE_ROOT':
        this.roleSelected = 'Administrador Root';
        break;
      case 'ROLE_ADMIN':
        this.roleSelected = 'Administrador';
        break;
      case 'ROLE_OPERATOR':
        this.roleSelected = 'Operador';
        break;
    }
  }

  getInitials(name: string) {
    this.initialsName = name
      .trim()
      .split(/\s+/)
      .map((word) => word.charAt(0))
      .join('')
      .toUpperCase();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    const width = window.innerWidth;
    const isMobile = window.innerWidth < 1024;
    const wasMobile = window.innerWidth < 1024;

    if (isMobile === wasMobile) {
      return;
    }

    if (width <= 768) {
      this.isHidden.set(true);
      this.isMobile.set(true);
    } else {
      this.isHidden.set(false);
      this.isMobile.set(false);
    }
  }

  menuOpen() {
    this.isHidden.update((value) => !value);
  }

  closeSession() {
    localStorage.removeItem('auth');
    this._router.navigate(['/login']);
  }
}
