import { CommonModule, registerLocaleData } from '@angular/common';
import localeEsMX from '@angular/common/locales/es';
import localeFR from '@angular/common/locales/fr';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { BreadcrumbComponent } from '../../layout/breadcrumb/breadcrumb.component';
import { EmpleadosDetailComponent } from './empleados-detail/empleados-detail.component';
import { EmpleadosListComponent } from './empleados-list/empleados-list.component';

registerLocaleData(localeEsMX);
registerLocaleData(localeFR);

const empleadoRoute: Routes = [
  { path: '', component: EmpleadosListComponent },
  { path: ':uuid', component: EmpleadosDetailComponent },
];

@NgModule({
  declarations: [EmpleadosListComponent, EmpleadosDetailComponent],
  imports: [
    BreadcrumbComponent,
    CommonModule,
    RouterModule.forChild(empleadoRoute),
    FormsModule,
    PaginationModule.forRoot(),
    TranslateModule,
    BsDropdownModule.forRoot(),
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'fr' },
    { provide: LOCALE_ID, useValue: 'es' },
  ],
})
export class EmpleadosModule {}
