/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { DebugElement } from '@angular/core';
import { ToolService } from '../tool.service';

import { SeeAlsoComponent } from './see-also.component';
import { GoogleAnalyticsService } from '../google-analytics.service';
import { Angulartics2 } from 'angulartics2';
import { Observable } from 'rxjs';

describe('SeeAlsoComponent', () => {
  let component: SeeAlsoComponent;
  let fixture: ComponentFixture<SeeAlsoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      declarations: [SeeAlsoComponent],
      providers: [ToolService, GoogleAnalyticsService,
        {
          provide: Angulartics2, useFactory: () => ({
            eventTrack: jasmine.createSpyObj('eventTrack', ['next']),
            pageTrack: jasmine.createSpyObj('pageTrack', ['next'])
          })
        }
      ]
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

  it('should not change active tool if ctrl was pressed while clicking on "see also" chart', inject([ToolService], (toolService) => {
    const event = document.createEvent("MouseEvents");
    event.initMouseEvent("click", true, true, window, 0, 0, 0, 80, 20, true, false, false, false, 0, null);
    event.preventDefault = jasmine.createSpy('preventDefault');

    spyOn(toolService, 'changeActiveTool');

    component.changeHandler(event, null);

    expect(toolService.changeActiveTool).not.toHaveBeenCalled();
  }));

  it('should change active tool if one of "see also" charts was clicked', inject([ToolService], (toolService) => {
    const event = document.createEvent("MouseEvents");
    event.initMouseEvent("click", true, true, window, 0, 0, 0, 80, 20, false, false, false, false, 0, null);
    event.preventDefault = jasmine.createSpy('preventDefault');

    spyOn(toolService, 'changeActiveTool');

    component.changeHandler(event, 'linechart');

    expect(toolService.changeActiveTool).toHaveBeenCalledTimes(1);
    expect(toolService.changeActiveTool).toHaveBeenCalledWith('linechart');
    expect(event.preventDefault).toHaveBeenCalled();
  }));
});
