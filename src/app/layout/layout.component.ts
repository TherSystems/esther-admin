import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { StorageService } from '../core/services/storage.service';
import { RootReducerState } from '../store/index.reducer';
import { LayoutStateInterface } from '../store/layouts/layout.reducer';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  // layout related config
  public layoutType!: string;
  public showMain: any;
  public initialAppState!: LayoutStateInterface;

  constructor(
    private _store: Store<RootReducerState>,
    private _storageService: StorageService
  ) {}

  ngOnInit(): void {
    this._store.select('layout').subscribe((data: LayoutStateInterface) => {
      this._storageService.setObject('theme', data);
      this.layoutType = data.LAYOUT;
      document.documentElement.setAttribute('data-layout', data.LAYOUT);
      data.LAYOUT == 'vertical' || data.LAYOUT == 'twocolumn'
        ? document.documentElement.setAttribute('data-sidebar', data.SIDEBAR_COLOR)
        : '';
      data.LAYOUT == 'vertical' ? document.documentElement.setAttribute('data-sidebar-size', data.SIDEBAR_SIZE) : '';
      document.documentElement.setAttribute('data-bs-theme', data.LAYOUT_MODE);
      document.documentElement.setAttribute('data-layout-width', data.LAYOUT_WIDTH);
      document.documentElement.setAttribute('data-sidebar-image', data.SIDEBAR_IMAGE);
      document.documentElement.setAttribute('data-layout-position', data.LAYOUT_POSITION);
      document.documentElement.setAttribute('data-layout-style', data.SIDEBAR_VIEW);
      document.documentElement.setAttribute('data-topbar', data.TOPBAR);
      document.documentElement.setAttribute('data-preloader', data.DATA_PRELOADER);
      document.documentElement.setAttribute('data-theme', data.LAYOUT_THEME);

      if (document.documentElement.getAttribute('data-preloader') == 'enable') {
        setTimeout(() => {
          (document.getElementById('preloader') as HTMLElement).style.opacity = '0';
          (document.getElementById('preloader') as HTMLElement).style.visibility = 'hidden';
        }, 1000);
      }
    });
  }

  /**
  /**
  * Check if the vertical layout is requested
  */
  isVerticalLayoutRequested(): boolean {
    return this.layoutType === 'vertical';
  }

  /**
   * Check if the horizontal layout is requested
   */
  isHorizontalLayoutRequested(): boolean {
    return this.layoutType === 'horizontal';
  }

  /**
   * Check if the horizontal layout is requested
   */
  isTwoColumnLayoutRequested(): boolean {
    return this.layoutType === 'twocolumn';
  }

  getLayoutRequest(): string {
    return this.layoutType;
  }
}
