import { Component } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { PopUpService } from '../../../core/services/popup.service';
import { EmployeeService } from '../empleados.service';

@Component({
  selector: 'app-empleados-list',
  templateUrl: './empleados-list.component.html',
  styleUrl: './empleados-list.component.scss'
})
export class EmpleadosListComponent{

  masterSelected!: boolean;
  products: any;
  empleados: any [] = []
  productForm!: UntypedFormGroup;
  endItem: any
// Table data
allproducts: any;


  constructor(
    private _employeeService: EmployeeService, 
    private _popUpService:PopUpService,
    private _route:Router
    ){}

  ngOnInit(){
    this.listAllEmployee()
    }


    
listAllEmployee(){
  this._employeeService.getAllEmployee().subscribe({
    next:(response)=>{
      this.empleados= response
      console.log('Esto trae el response',this.empleados)},
    error: (error)=>{console.log(error)
    this._popUpService.errorsApi(error)
    }
  })
}

goToEmployeeDetail(){
  this._route.navigate(['/empleados-detail'])
}

  checkedValGet: any[] = [];
  // The master checkbox will check/ uncheck all items
  checkUncheckAll(ev: any) {
    this.products = this.products.map((x: { states: any }) => ({ ...x, states: ev.target.checked }));

    var checkedVal: any[] = [];
    var result;
    for (var i = 0; i < this.products.length; i++) {
      if (this.products[i].states == true) {
        result = this.products[i].id;
        checkedVal.push(result);
      }
    }

    this.checkedValGet = checkedVal;
    checkedVal.length > 0 ? document.getElementById("remove-actions")?.classList.remove('d-none') : document.getElementById("remove-actions")?.classList.add('d-none');
  }


  public items: string[] = ['Adidas', 'Boat', 'Puma', 'Realme'];
  // Sort Data
  direction: any = 'asc';

  compare(v1: string | number, v2: string | number) {
    return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
  }
  
    // Select Checkbox value Get
    onCheckboxChange(e: any) {
      var checkedVal: any[] = [];
      var result
      for (var i = 0; i < this.products.length; i++) {
        if (this.products[i].states == true) {
          result = this.products[i].id;
          checkedVal.push(result);
        }
      }
      this.checkedValGet = checkedVal
      checkedVal.length > 0 ? document.getElementById("remove-actions")?.classList.remove('d-none') : document.getElementById("remove-actions")?.classList.add('d-none');
    }


  
    pageChanged(event: PageChangedEvent): void {
      const startItem = (event.page - 1) * event.itemsPerPage;
      this.endItem = event.page * event.itemsPerPage;
      this.products = this.allproducts.slice(startItem, this.endItem);
    }




}
