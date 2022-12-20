/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UsertypeFinderAdminUnroutedComponent } from './usertype-finder-admin-unrouted.component';

describe('UsertypeFinderAdminUnroutedComponent', () => {
  let component: UsertypeFinderAdminUnroutedComponent;
  let fixture: ComponentFixture<UsertypeFinderAdminUnroutedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsertypeFinderAdminUnroutedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsertypeFinderAdminUnroutedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
