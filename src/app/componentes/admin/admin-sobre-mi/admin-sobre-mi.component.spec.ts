import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSobreMiComponent } from './admin-sobre-mi.component';

describe('AdminSobreMiComponent', () => {
  let component: AdminSobreMiComponent;
  let fixture: ComponentFixture<AdminSobreMiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminSobreMiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminSobreMiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
