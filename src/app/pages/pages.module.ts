import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { pagesRouting } from './pages.routing';

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(pagesRouting)],
})
export class PagesModule {}
