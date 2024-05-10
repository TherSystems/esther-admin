import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { PopUpService } from '../../../core/services/popup.service';
import { SortedService } from '../../../core/services/sorted.service';
import { EmpleadosResponse } from '../empleados.interface';
import { EmpleadosService } from '../empleados.service';

@Component({
  selector: 'app-empleados-list',
  templateUrl: './empleados-list.component.html',
  styleUrl: './empleados-list.component.scss',
})
export class EmpleadosListComponent implements OnInit {
  /* ----------------------- Informacion del breadcrumb ----------------------- */
  public breadCrumbItems = [{ label: 'EMPLEADOS.TITULO' }, { label: 'EMPLEADOS.LISTA', active: true }];
  /* ----------------------- Elementos de la paginacion ----------------------- */
  public direction: 'asc' | 'desc' = 'asc';
  public itemsPorPagina = 10;
  /* ----------------- Lista de datos para mostrar en la tabla ---------------- */
  public empleadosArray: EmpleadosResponse[] = [];
  public filterArray: EmpleadosResponse[] = [];

  constructor(
    public _sortedService: SortedService,
    public _translateService: TranslateService,
    private _employeeService: EmpleadosService,
    private _popUpService: PopUpService
  ) {}

  ngOnInit(): void {
    this.getEmpleados();
  }

  /* -------------------------------------------------------------------------- */
  /*                             METODOS DE NEGOCIO                             */
  /* -------------------------------------------------------------------------- */
  getEmpleados(): void {
    this._employeeService.getEmpleados().subscribe({
      next: (response: EmpleadosResponse[]) => {
        this.empleadosArray = response;
        this.filterArray = this.empleadosArray.slice(0, this.itemsPorPagina);
      },
      error: error => {
        this._popUpService.errorsApi(error);
      },
    });
  }

  /* -------------------------------------------------------------------------- */
  /*                    Metodos de paginación y ordenamiento                    */
  /* -------------------------------------------------------------------------- */
  pageChanged(event: PageChangedEvent): void {
    const startItem: number = (event.page - 1) * event.itemsPerPage;
    const endItem: number = event.page * event.itemsPerPage;
    this.filterArray = this.empleadosArray.slice(startItem, endItem);
  }

  onSort(column: string): void {
    this.filterArray = this._sortedService.sorted(this.direction, this.filterArray, column);
    this.direction = this.direction === 'asc' ? 'desc' : 'asc';
  }
}
