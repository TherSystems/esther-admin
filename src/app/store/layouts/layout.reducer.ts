import { Injectable } from '@angular/core';
import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { StorageService } from '../../core/services/storage.service';
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
} from './layout.actions';
import {
  DATA_SIDEBAR_COLOR,
  DATA_SIDEBAR_IMAGE,
  LAYOUT_MODE_TYPES,
  LAYOUT_POSITION_TYPES,
  LAYOUT_THEME_TYPES,
  LAYOUT_TOPBAR_COLOR_TYPES,
  LAYOUT_TYPES,
  LAYOUT_WIDTH_TYPES,
  LEFT_SIDEBAR_SIZE,
  LEFT_SIDEBAR_VIEW,
  PERLOADER_TYPES,
} from './layout.state';

export interface LayoutStateInterface {
  LAYOUT: string;
  LAYOUT_THEME: string;
  LAYOUT_MODE: string;
  LAYOUT_WIDTH: string;
  LAYOUT_POSITION: string;
  TOPBAR: string;
  SIDEBAR_SIZE: string;
  SIDEBAR_VIEW: string;
  SIDEBAR_COLOR: string;
  SIDEBAR_IMAGE: string;
  DATA_PRELOADER: string;
}

// IntialState
export const initialState: LayoutStateInterface = {
  LAYOUT: localStorage.getItem('theme') || LAYOUT_TYPES.VERTICAL,
  LAYOUT_THEME: LAYOUT_THEME_TYPES.INTERACTION,
  LAYOUT_MODE: LAYOUT_MODE_TYPES.LIGHTMODE,
  LAYOUT_WIDTH: LAYOUT_WIDTH_TYPES.FLUID,
  LAYOUT_POSITION: LAYOUT_POSITION_TYPES.FIXED,
  TOPBAR: LAYOUT_TOPBAR_COLOR_TYPES.LIGHT,
  SIDEBAR_SIZE: LEFT_SIDEBAR_SIZE.DEFAULT,
  SIDEBAR_VIEW: LEFT_SIDEBAR_VIEW.DEFAULT,
  SIDEBAR_COLOR: DATA_SIDEBAR_COLOR.DARK,
  SIDEBAR_IMAGE: DATA_SIDEBAR_IMAGE.NONE,
  DATA_PRELOADER: PERLOADER_TYPES.DISABLE,
};

@Injectable({
  providedIn: 'root',
})
export class LayoutReducerService {
  // Reducer
  public layoutReducer: ActionReducer<LayoutStateInterface, Action>;

  constructor(private _storageService: StorageService) {
    this.layoutReducer = createReducer(
      _storageService.getObject<LayoutStateInterface>('theme') || (initialState as LayoutStateInterface),
      on(changelayoutTheme, (state, action) => ({ ...state, LAYOUT: action.layout })),
      on(changeTheme, (state, action) => ({ ...state, LAYOUT_THEME: action.theme })),
      on(changeMode, (state, action) => ({ ...state, LAYOUT_MODE: action.mode })),
      on(changewidthLayout, (state, action) => ({ ...state, LAYOUT_WIDTH: action.width })),
      on(changeposition, (state, action) => ({ ...state, LAYOUT_POSITION: action.position })),
      on(changetopbar, (state, action) => {
        return { ...state, TOPBAR: action.topbar };
      }),
      on(changesize, (state, action) => ({ ...state, SIDEBAR_SIZE: action.size })),
      on(changesidebarView, (state, action) => ({ ...state, SIDEBAR_VIEW: action.sidebarView })),
      on(changesidebarcolor, (state, action) => ({ ...state, SIDEBAR_COLOR: action.sidebar })),
      on(changesidebarImage, (state, action) => ({ ...state, SIDEBAR_IMAGE: action.sidebarImage })),
      on(changepreLoader, (state, action) => ({ ...state, DATA_PRELOADER: action.preLoader }))
    );
  }
  // Selector
  public reducer(state: LayoutStateInterface | undefined, action: Action): LayoutStateInterface {
    return this.layoutReducer(state, action);
  }
}
