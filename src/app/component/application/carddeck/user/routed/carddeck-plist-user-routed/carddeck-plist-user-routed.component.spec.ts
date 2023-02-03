/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CarddeckPlistUserRoutedComponent } from './carddeck-plist-user-routed.component';

describe('CarddeckPlistUserRoutedComponent', () => {
  let component: CarddeckPlistUserRoutedComponent;
  let fixture: ComponentFixture<CarddeckPlistUserRoutedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarddeckPlistUserRoutedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarddeckPlistUserRoutedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
