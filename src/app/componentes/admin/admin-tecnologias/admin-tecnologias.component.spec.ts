import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTecnologiasComponent } from './admin-tecnologias.component';

describe('AdminTecnologiasComponent', () => {
  let component: AdminTecnologiasComponent;
  let fixture: ComponentFixture<AdminTecnologiasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminTecnologiasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminTecnologiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
