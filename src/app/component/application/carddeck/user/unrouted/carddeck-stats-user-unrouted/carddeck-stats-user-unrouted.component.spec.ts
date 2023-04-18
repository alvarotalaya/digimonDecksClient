/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CarddeckStatsUserUnroutedComponent } from './carddeck-stats-user-unrouted.component';

describe('CarddeckStatsUserUnroutedComponent', () => {
  let component: CarddeckStatsUserUnroutedComponent;
  let fixture: ComponentFixture<CarddeckStatsUserUnroutedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarddeckStatsUserUnroutedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarddeckStatsUserUnroutedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
