import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PosItemFormPageComponent } from './pos-item-form-page.component';

describe('PosItemFormPageComponent', () => {
  let component: PosItemFormPageComponent;
  let fixture: ComponentFixture<PosItemFormPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PosItemFormPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PosItemFormPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
