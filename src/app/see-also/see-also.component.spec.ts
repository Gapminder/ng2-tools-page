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

fdescribe('SeeAlsoComponent', () => {
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
        },
        {
          provide: ToolService,
          useFactory: () => ({
            changeActiveTool: jasmine.createSpy('changeActiveTool'),
            getToolLoadEvents: () => Observable.empty(),
            getToolChangeEvents: () => Observable.empty()
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
    component.changeHandler({ctrlKey: true} as MouseEvent, null);

    expect(toolService.changeActiveTool).not.toHaveBeenCalled();
  }));

  it('should change active tool if one of "see also" charts was clicked', inject([ToolService], (toolService) => {
    component.changeHandler({ctrlKey: false} as MouseEvent, 'linechart');

    expect(toolService.changeActiveTool).toHaveBeenCalledTimes(1);
    expect(toolService.changeActiveTool).toHaveBeenCalledWith('linechart');
  }));
});
