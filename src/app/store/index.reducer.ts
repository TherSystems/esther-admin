import { ActionReducerMap } from '@ngrx/store';
import { StorageService } from '../core/services/storage.service';
import { LayoutReducerService, LayoutStateInterface } from './layouts/layout.reducer';

export interface RootReducerState {
  layout: LayoutStateInterface;
}

// Crear una instancia de StorageService
const storageService = new StorageService();

// Crear una instancia de LayoutReducerService con el StorageService
const layoutReducerService = new LayoutReducerService(storageService);

// Definir el rootReducer utilizando layoutReducer de LayoutReducerService
export const rootReducer: ActionReducerMap<RootReducerState> = {
  layout: layoutReducerService.layoutReducer,
};
