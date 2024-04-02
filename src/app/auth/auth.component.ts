import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StorageService } from '../core/services/storage.service';
import { LayoutStateInterface, initialState } from '../store/layouts/layout.reducer';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  standalone: true,
  imports: [RouterModule],
})
export class AuthComponent implements OnInit {
  public theme: LayoutStateInterface;

  constructor(private _storageService: StorageService) {
    this.theme = this._storageService.getObject<LayoutStateInterface>('theme') || initialState;
  }

  ngOnInit(): void {
    document.documentElement.setAttribute('data-layout', this.theme.LAYOUT);
    document.documentElement.setAttribute('data-sidebar', this.theme.SIDEBAR_COLOR);
    document.documentElement.setAttribute('data-bs-theme', this.theme.LAYOUT_MODE);
    document.documentElement.setAttribute('data-layout-width', this.theme.LAYOUT_WIDTH);
    document.documentElement.setAttribute('data-sidebar-image', this.theme.SIDEBAR_IMAGE);
    document.documentElement.setAttribute('data-layout-position', this.theme.LAYOUT_POSITION);
    document.documentElement.setAttribute('data-layout-style', this.theme.SIDEBAR_VIEW);
    document.documentElement.setAttribute('data-topbar', this.theme.TOPBAR);
    document.documentElement.setAttribute('data-preloader', this.theme.DATA_PRELOADER);
    document.documentElement.setAttribute('data-theme', this.theme.LAYOUT_THEME);

    window.addEventListener('resize', function () {
      if (document.documentElement.clientWidth <= 767) {
        document.documentElement.setAttribute('data-sidebar-size', '');
        document.querySelector('.hamburger-icon')?.classList.add('open');
      } else if (document.documentElement.clientWidth <= 1024) {
        document.documentElement.setAttribute('data-sidebar-size', 'sm');
        document.querySelector('.hamburger-icon')?.classList.add('open');
      } else if (document.documentElement.clientWidth >= 1024) {
        document.documentElement.setAttribute('data-sidebar-size', 'lg');
        document.querySelector('.hamburger-icon')?.classList.remove('open');
      }
    });
  }
}
