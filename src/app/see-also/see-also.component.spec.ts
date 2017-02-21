/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { DebugElement } from '@angular/core';
import { ToolService } from '../tool.service';

import { SeeAlsoComponent } from './see-also.component';
import { GoogleAnalyticsService } from '../google-analytics.service';
import { Angulartics2 } from 'angulartics2';

describe('SeeAlsoComponent', () => {
  let component: SeeAlsoComponent;
  let fixture: ComponentFixture<SeeAlsoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      declarations: [ SeeAlsoComponent ],
      providers: [ ToolService, GoogleAnalyticsService, {
        provide: Angulartics2, useFactory: () => ({
          eventTrack: jasmine.createSpyObj('eventTrack', ['next']),
          pageTrack: jasmine.createSpyObj('pageTrack', ['next'])
        })
      } ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeeAlsoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
