import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleadosDetailComponent } from './empleados-detail.component';

describe('EmpleadosDetailComponent', () => {
  let component: EmpleadosDetailComponent;
  let fixture: ComponentFixture<EmpleadosDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmpleadosDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmpleadosDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
