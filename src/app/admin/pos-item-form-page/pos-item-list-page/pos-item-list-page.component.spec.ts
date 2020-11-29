import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PosItemListPageComponent } from './pos-item-list-page.component';

describe('PosItemListPageComponent', () => {
  let component: PosItemListPageComponent;
  let fixture: ComponentFixture<PosItemListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PosItemListPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PosItemListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
