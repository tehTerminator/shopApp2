import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PosEditFormComponent } from './pos-edit-form.component';

describe('PosEditFormComponent', () => {
  let component: PosEditFormComponent;
  let fixture: ComponentFixture<PosEditFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PosEditFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PosEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
