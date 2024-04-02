import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Route, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';

const homeRoute: Route = { path: '', component: HomeComponent };

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, RouterModule.forChild([homeRoute]), FormsModule],
})
export class HomeModule {}
