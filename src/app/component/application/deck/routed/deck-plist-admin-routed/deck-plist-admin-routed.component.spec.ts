/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DeckPlistAdminRoutedComponent } from './deck-plist-admin-routed.component';

describe('DeckPlistAdminRoutedComponent', () => {
  let component: DeckPlistAdminRoutedComponent;
  let fixture: ComponentFixture<DeckPlistAdminRoutedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeckPlistAdminRoutedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeckPlistAdminRoutedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
