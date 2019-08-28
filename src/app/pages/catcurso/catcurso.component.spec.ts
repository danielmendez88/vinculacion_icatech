import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatcursoComponent } from './catcurso.component';

describe('CatcursoComponent', () => {
  let component: CatcursoComponent;
  let fixture: ComponentFixture<CatcursoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatcursoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatcursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
