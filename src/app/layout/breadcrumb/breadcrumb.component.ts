import { Component, Input, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss',
  standalone: true,
  imports: [TranslateModule],
})
export class BreadcrumbComponent implements OnInit {
  @Input() public title: string = '';
  @Input() public breadcrumbItems: Array<{ label: string; active?: boolean }> = [];

  public Item!: Array<{ label?: string }>;

  constructor() {}

  ngOnInit(): void {}
}
