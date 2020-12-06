import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateEditFormComponent } from './template-edit-form.component';

describe('TemplateEditFormComponent', () => {
  let component: TemplateEditFormComponent;
  let fixture: ComponentFixture<TemplateEditFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemplateEditFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
