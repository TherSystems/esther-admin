import { Component, ViewChild } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-empleados-list',
  templateUrl: './empleados-list.component.html',
  styleUrl: './empleados-list.component.scss'
})
export class EmpleadosListComponent {

  masterSelected!: boolean;
  products: any;
  productForm!: UntypedFormGroup;
  endItem: any
// Table data
allproducts: any;


  @ViewChild('showModal', { static: false }) showModal?: ModalDirective;
  @ViewChild('deleteRecordModal', { static: false }) deleteRecordModal?: ModalDirective;
  deleteId: any;

  uploadedFiles: any[] = [];


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
  onSort(column: any) {
    if (this.direction == 'asc') {
      this.direction = 'desc';
    } else {
      this.direction = 'asc';
    }
    const sortedArray = [...this.products]; // Create a new array
    sortedArray.sort((a, b) => {
      const res = this.compare(a[column], b[column]);
      return this.direction === 'asc' ? res : -res;
    });
    this.products = sortedArray;
  }
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


      // Delete Product
  removeItem(id: any) {
    this.deleteId = id
    this.deleteRecordModal?.show()
  }
    // Edit Data
    editList(id: any) {
      this.showModal?.show()
      var modaltitle = document.querySelector('.modal-title') as HTMLAreaElement
      modaltitle.innerHTML = 'Edit Product'
      var modalbtn = document.getElementById('add-btn') as HTMLAreaElement
      modalbtn.innerHTML = 'Update'
  
      var editData = this.products[id]
      this.uploadedFiles.push({ 'dataURL': editData.img, 'name': editData.img_alt, 'size': 1024, });
      this.productForm.patchValue(this.products[id]);
    }
  
    pageChanged(event: PageChangedEvent): void {
      const startItem = (event.page - 1) * event.itemsPerPage;
      this.endItem = event.page * event.itemsPerPage;
      this.products = this.allproducts.slice(startItem, this.endItem);
    }

}
