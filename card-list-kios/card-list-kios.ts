import { Component, input, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IKioscoView } from '../../../pages/listado-kioscos/interfaces/listado-kioscos.interface';
import { CommonModule } from '@angular/common';
import { Icon } from '../icon/icon';

@Component({
  selector: 'app-card-list-kios',
  imports: [CommonModule, Icon],
  templateUrl: './card-list-kios.html'
})
export class CardListKios {
  private readonly router = inject(Router);

  kioscos = input<IKioscoView[]>([]);

  goToKioscoDetails(id: string) {
    this.router.navigate(['/listado-kioscos', id]);
  }

  getHopperStyles(denomination: number, count: number) {
    let status = 'normal';

    if (denomination === 1) {
      if (count <= 100) status = 'red';
      else if (count <= 200) status = 'orange';
    }
    else if (denomination === 5) {
      if (count <= 40) status = 'red';
      else if (count <= 80) status = 'orange';
    }
    else if (denomination === 10) {
      if (count <= 20) status = 'red';
      else if (count <= 40) status = 'orange';
    }
    switch (status) {
      case 'red':
        return {
          wrapper: 'border-[#f9a6a2] text-[#d64b3f] bg-[#fbe7e6]',
          divider: 'border-[#f9a6a2]'
        };
      case 'orange':
        return {
          wrapper: 'border-[#f5c792] text-[#c9750f] bg-[#fdedd9]',
          divider: 'border-[#f5c792]'
        };
      default:
        return {
          wrapper: 'border-gray-200 text-gray-600 bg-[#f8f9fa]',
          divider: 'border-gray-200'
        };
    }
  }

  getSimsStatus(available: number): { label: string; cls: string } {
    if (available <= 10) return { label: 'Urgente', cls: 'text-[#d64b3f]' };
    if (available <= 80) return { label: 'Atención', cls: 'text-[#c9750f]' };
    if (available >= 150) return { label: 'Suficiente', cls: 'text-gray-500' };
    return { label: 'Suficiente', cls: 'text-gray-500' };
  }

  getBadgeClass(text: string): string {
    const normalize = text.toLowerCase();
    if (
      normalize.includes('aceptador') ||
      normalize.includes('reciclador') ||
      normalize === 'nuevo'
    ) {
      return 'bg-[#e8f1fa] text-[#007EAE]';
    }
    if (normalize === 'activo') return 'bg-[#e3f6ea] text-[#16924f]';
    if (normalize.includes('mantenimiento') || normalize.includes('abierto'))
      return 'bg-[#fcf0e3] text-[#c9750f]';
    if (
      normalize.includes('fuera') ||
      normalize.includes('descuadre') ||
      normalize.includes('sin tipo')
    )
      return 'bg-[#fbe7e6] text-[#d64b3f]';

    return 'bg-gray-100 text-gray-600';
  }
}
