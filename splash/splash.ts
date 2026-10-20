import { Component, ElementRef, Renderer2, ViewChild, effect, inject } from '@angular/core';
import { SplashService } from '../../services/splash/splash.service';
import { AUTH_ICONS } from '../../constants/icons.constants';


@Component({
  selector: 'app-splash',
  standalone: true,
  templateUrl: './splash.html',
  styleUrl: './splash.scss'
})
export class SplashComponent {
  private readonly _splashService = inject(SplashService);
  private readonly _renderer = inject(Renderer2);

  icons = AUTH_ICONS.LOGO;

  @ViewChild('splashDialog') splashDialog!: ElementRef<HTMLDialogElement>;

  constructor() {
    effect(() => {
      this._splashService.loading$.subscribe((isLoading) => {
        if (!this.splashDialog) return;

        if (isLoading) {
          this.splashDialog.nativeElement.showModal();
          this._renderer.addClass(document.body, 'hide-loader-scroll');
        } else {
          this.splashDialog.nativeElement.close();
          this._renderer.removeClass(document.body, 'hide-loader-scroll');
        }
      });
    });
  }
}
