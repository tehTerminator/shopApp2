import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountGroupsFormComponent } from './account-groups-form.component';

describe('AccountGroupsFormComponent', () => {
  let component: AccountGroupsFormComponent;
  let fixture: ComponentFixture<AccountGroupsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountGroupsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountGroupsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
