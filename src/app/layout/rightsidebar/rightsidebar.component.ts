import { Component, EventEmitter, OnInit, Output, Renderer2 } from '@angular/core';
import { Store } from '@ngrx/store';
import { NgxSpinnerService } from 'ngx-spinner';
import { take } from 'rxjs/operators';
import { EventService } from '../../core/services/event.service';
import { RootReducerState } from '../../store/index.reducer';
import {
  changeMode,
  changeTheme,
  changelayoutTheme,
  changeposition,
  changepreLoader,
  changesidebarImage,
  changesidebarView,
  changesidebarcolor,
  changesize,
  changetopbar,
  changewidthLayout,
} from '../../store/layouts/layout.actions';
import { LayoutStateInterface, initialState } from '../../store/layouts/layout.reducer';
import {
  getLayout,
  getLayoutTheme,
  getLayoutWidth,
  getLayoutmode,
  getPosition,
  getPreloader,
  getSidebarcolor,
  getSidebarsize,
  getTopbar,
  getsidebarimage,
  getsidebarview,
} from '../../store/layouts/layout.selectors';
import { MENU } from '../sidebar/menu';

@Component({
  selector: 'app-rightsidebar',
  templateUrl: './rightsidebar.component.html',
  styleUrls: ['./rightsidebar.component.scss'],
})
export class RightsidebarComponent implements OnInit {
  public rightsidebar: any;
  public attribute: any;
  public grd: any;
  public layout!: string;
  public layoutTheme: any;
  public layoutmode: any;
  public layoutposition: any;
  public sidebarsize: any;
  public sidebarViews: any;
  public topbar: any;
  public sidebarcolor: any;
  public sidebarimage: any;
  public preloader: any;
  public layoutWidth: any;
  public initialAppState!: LayoutStateInterface;
  public menuItems: any;
  @Output() public settingsButtonClicked = new EventEmitter();

  constructor(
    public _store: Store<RootReducerState>,
    private _spinner: NgxSpinnerService,
    public _renderer: Renderer2,
    public _eventService: EventService
  ) {}

  ngOnInit(): void {
    this.menuItems = MENU;
    this.initialAppState = initialState;

    this._store.select('layout').subscribe((data: any) => {
      this.layout = data.LAYOUT;
      this.layoutTheme = data.LAYOUT_THEME;
      this.layoutWidth = data.LAYOUT_WIDTH;
      this.layoutmode = data.LAYOUT_MODE;
      this.layoutposition = data.LAYOUT_POSITION;
      this.topbar = data.TOPBAR;
      this.sidebarsize = data.SIDEBAR_SIZE;
      this.sidebarViews = data.SIDEBAR_VIEW;
      this.sidebarcolor = data.SIDEBAR_COLOR;
      this.sidebarimage = data.SIDEBAR_IMAGE;
      this.preloader = data.DATA_PRELOADER;
    });
  }

  //  Filter Offcanvas Set
  openEnd(): void {
    document.querySelector('.righsidebar')?.classList.add('show');
    document.querySelector('.backdrop2')?.classList.add('show');

    setTimeout(() => {
      this.attribute = document.documentElement.getAttribute('data-layout');
      if (this.attribute == 'vertical') {
        const vertical = document.getElementById('customizer-layout01') as HTMLInputElement;
        if (vertical != null) {
          vertical.setAttribute('checked', 'true');
        }
      }
      if (this.attribute == 'horizontal') {
        const horizontal = document.getElementById('customizer-layout02');
        if (horizontal != null) {
          horizontal.setAttribute('checked', 'true');
        }
      }
      if (this.attribute == 'twocolumn') {
        const Twocolumn = document.getElementById('customizer-layout03');
        if (Twocolumn != null) {
          Twocolumn.setAttribute('checked', 'true');
        }
      }
    }, 0);
  }

  closeoffcanvas(): void {
    document.querySelector('.righsidebar')?.classList.remove('show');
    document.querySelector('.backdrop2')?.classList.remove('show');
  }
  /**
   * Change the layout onclick
   * @param layout Change the layout
   */
  changeLayout(layout: string): void {
    this.layout = layout;
    this._store.dispatch(changelayoutTheme({ layout }));
    this._eventService.broadcast('changeLayout', layout);
    this._store
      .select(getLayout)
      .pipe(take(1))
      .subscribe(layout => {
        document.documentElement.setAttribute('data-layout', layout);
        setTimeout(() => {
          window.dispatchEvent(new Event('resize'));
        }, 1500);
      });
  }

  // change theme
  changeTheme(theme: string): void {
    this._spinner.show();
    this.layoutTheme = theme;
    // store
    this._store.dispatch(changeTheme({ theme }));
    this._store
      .select(getLayoutTheme)
      .pipe(take(1))
      .subscribe(theme => {
        this._renderer.setAttribute(document.documentElement, 'data-bs-theme', theme);
      });
    setTimeout(() => {
      this._spinner.hide();
    }, 1000);
    if (theme == 'minimal') {
      this._renderer.setAttribute(document.documentElement, 'data-sidebar', 'light');
    } else {
      this._renderer.setAttribute(document.documentElement, 'data-sidebar', 'dark');
    }
  }

  // Sidebar Size Change
  changeSidebar(sidebarView: string): void {
    this.sidebarViews = sidebarView;
    this._store.dispatch(changesidebarView({ sidebarView }));
    this._store
      .select(getsidebarview)
      .pipe(take(1))
      .subscribe(sidebarView => {
        this._renderer.setAttribute(document.documentElement, 'data-layout-style', sidebarView);
      });
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 0);
  }

  // Sidebar Size Change
  changeSidebarSize(size: string): void {
    this.sidebarsize = size;
    // store
    setTimeout(() => {
      this._store.dispatch(changesize({ size }));
      this._store
        .select(getSidebarsize)
        .pipe(take(1))
        .subscribe(size => {
          this._renderer.setAttribute(document.documentElement, 'data-sidebar-size', size);
        });
    }, 0);
  }

  // Add Active Class
  addActive(grdSidebar: any): void {
    this.sidebarcolor = grdSidebar;
    this.grd = grdSidebar;
    document.documentElement.setAttribute('data-sidebar', grdSidebar);
    document.getElementById('collapseBgGradient')?.classList.toggle('show');
    document.getElementById('collapseBgGradient1')?.classList.add('active');
  }

  // Remove Active Class
  removeActive(): void {
    this.grd = '';
    document.getElementById('collapseBgGradient1')?.classList.remove('active');
    document.getElementById('collapseBgGradient')?.classList.remove('show');
  }

  // When the user clicks on the button, scroll to the top of the document
  topFunction(): void {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  // Mode Change
  changeMode(mode: string): void {
    this.layoutmode = mode;
    this._store.dispatch(changeMode({ mode }));
    this._store
      .select(getLayoutmode)
      .pipe(take(1))
      .subscribe(mode => {
        this._renderer.setAttribute(document.documentElement, 'data-bs-theme', mode);
      });
    if (mode === 'light') {
      this._renderer.setAttribute(document.documentElement, 'data-topbar', 'light');
    } else {
      this._renderer.setAttribute(document.documentElement, 'data-topbar', mode);
    }
  }

  // Sidebar Color Change
  changeSidebarColor(sidebar: string): void {
    this.sidebarcolor = sidebar;
    setTimeout(() => {
      this._store.dispatch(changesidebarcolor({ sidebar }));
      this._store
        .select(getSidebarcolor)
        .pipe(take(1))
        .subscribe(sidebar => {
          this._renderer.setAttribute(document.documentElement, 'data-sidebar', sidebar);
        });
    }, 0);
  }

  // Width Change
  changeWidth(width: string, size: string): void {
    this.layoutWidth = width;
    this._store.dispatch(changewidthLayout({ width }));
    this._store
      .select(getLayoutWidth)
      .pipe(take(1))
      .subscribe(width => {
        this._renderer.setAttribute(document.documentElement, 'data-layout-width', width);
      });
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
      document.documentElement.setAttribute('data-sidebar-size', size);
    }, 0);
  }
  // Position Change
  changePosition(position: string): void {
    this.layoutposition = position;
    this._store.dispatch(changeposition({ position }));
    this._store
      .select(getPosition)
      .pipe(take(1))
      .subscribe(position => {
        this._renderer.setAttribute(document.documentElement, 'data-layout-position', position);
      });
  }

  // Topbar Change
  changeTopColor(topbar: string): void {
    this.topbar = topbar;
    this._store.dispatch(changetopbar({ topbar }));
    this._store
      .select(getTopbar)
      .pipe(take(1))
      .subscribe(topbar => {
        this._renderer.setAttribute(document.documentElement, 'data-topbar', topbar);
      });
  }

  // Sidebar Image Change
  changeSidebarImage(sidebarImage: string): void {
    this.sidebarimage = sidebarImage;
    this._store.dispatch(changesidebarImage({ sidebarImage }));
    this._store
      .select(getsidebarimage)
      .pipe(take(1))
      .subscribe(sidebarImage => {
        this._renderer.setAttribute(document.documentElement, 'data-sidebar-image', sidebarImage);
      });
  }

  // PreLoader Image Change
  changeLoader(preLoader: string): void {
    this.preloader = preLoader;
    this._store.dispatch(changepreLoader({ preLoader }));
    this._store
      .select(getPreloader)
      .pipe(take(1))
      .subscribe(preLoader => {
        this._renderer.setAttribute(document.documentElement, 'data-preloader', preLoader);
      });
    const preloader = document.getElementById('preloader');
    if (preloader) {
      setTimeout(() => {
        this._renderer.setStyle(preloader, 'opacity', '0');
        this._renderer.setStyle(preloader, 'visibility', 'hidden');
      }, 1000);
    }
  }
}
