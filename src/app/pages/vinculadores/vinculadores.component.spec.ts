import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VinculadoresComponent } from './vinculadores.component';

describe('VinculadoresComponent', () => {
  let component: VinculadoresComponent;
  let fixture: ComponentFixture<VinculadoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VinculadoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VinculadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
