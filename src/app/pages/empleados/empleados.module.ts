import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { EmpleadosDetailComponent } from './empleados-detail/empleados-detail.component';
import { EmpleadosListComponent } from './empleados-list/empleados-list.component';

const empleadoRoute : Routes = [
  { path: '', component: EmpleadosListComponent},
  { path: ':uuid', component: EmpleadosDetailComponent}
];

@NgModule({
  declarations: [
    EmpleadosListComponent,
    EmpleadosDetailComponent
  ],
  imports: [
    CommonModule,RouterModule.forChild(empleadoRoute),FormsModule, PaginationModule.forRoot()]
})
export class EmpleadosModule { }
