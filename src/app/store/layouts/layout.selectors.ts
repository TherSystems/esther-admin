import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LayoutStateInterface } from './layout.reducer';

const getLayoutState = createFeatureSelector<LayoutStateInterface>('layout');

export const getLayout = createSelector(getLayoutState, (state: LayoutStateInterface) => state.LAYOUT);

export const getLayoutmode = createSelector(getLayoutState, (state: LayoutStateInterface) => state.LAYOUT_MODE);

export const getLayoutTheme = createSelector(getLayoutState, (state: LayoutStateInterface) => state.LAYOUT_THEME);
export const getPosition = createSelector(getLayoutState, (state: LayoutStateInterface) => state.LAYOUT_POSITION);

export const getLayoutWidth = createSelector(getLayoutState, (state: LayoutStateInterface) => state.LAYOUT_WIDTH);

export const getTopbar = createSelector(getLayoutState, (state: LayoutStateInterface) => {
  return state.TOPBAR;
});

export const getSidebarsize = createSelector(getLayoutState, (state: LayoutStateInterface) => state.SIDEBAR_SIZE);

export const getsidebarview = createSelector(getLayoutState, (state: LayoutStateInterface) => state.SIDEBAR_VIEW);

export const getsidebarimage = createSelector(getLayoutState, (state: LayoutStateInterface) => state.SIDEBAR_IMAGE);

export const getSidebarcolor = createSelector(getLayoutState, (state: LayoutStateInterface) => state.SIDEBAR_COLOR);

export const getPreloader = createSelector(getLayoutState, (state: LayoutStateInterface) => state.DATA_PRELOADER);
