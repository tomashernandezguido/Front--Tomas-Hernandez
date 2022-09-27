import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEducacionComponent } from './admin-educacion.component';

describe('AdminEducacionComponent', () => {
  let component: AdminEducacionComponent;
  let fixture: ComponentFixture<AdminEducacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminEducacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminEducacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
