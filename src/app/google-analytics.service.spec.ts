/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GoogleAnalyticsService } from './google-analytics.service';
import { Angulartics2 } from 'angulartics2';

describe('Service: DeprecatedUrl', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GoogleAnalyticsService, {
        provide: Angulartics2, useFactory: () => ({
          eventTrack: jasmine.createSpyObj('eventTrack', ['next']),
          pageTrack: jasmine.createSpyObj('pageTrack', ['next'])
        })
      }]
    });
  });

  it('should be created', inject([GoogleAnalyticsService], (service: GoogleAnalyticsService) => {
    expect(service).toBeTruthy();
  }));

  it('tracks page views', inject([GoogleAnalyticsService, Angulartics2], (service: GoogleAnalyticsService, angulartics2Mock: Angulartics2) => {
    const path = 'Boo!';

    service.trackPage(path);

    expect(angulartics2Mock.pageTrack.next).toHaveBeenCalledTimes(1);
    expect(angulartics2Mock.pageTrack.next).toHaveBeenCalledWith({path});
  }));

  it('tracks vizabi model changes', inject([GoogleAnalyticsService, Angulartics2], (service: GoogleAnalyticsService, angulartics2Mock: Angulartics2) => {
    const model = 'Boo!';

    service.trackVizabiModelChangedEvent(model);

    expect(angulartics2Mock.eventTrack.next).toHaveBeenCalledTimes(1);
    expect(angulartics2Mock.eventTrack.next).toHaveBeenCalledWith({
      action: model,
      properties: {category: 'Vizabi Model Changed'}
    });
  }));

  it('tracks tool changes', inject([GoogleAnalyticsService, Angulartics2], (service: GoogleAnalyticsService, angulartics2Mock: Angulartics2) => {
    const tool = 'bubbles';
    const previousTool = 'linechart';

    service.trackToolChangedEvent({from: previousTool, to: tool});

    expect(angulartics2Mock.eventTrack.next).toHaveBeenCalledTimes(1);
    expect(angulartics2Mock.eventTrack.next).toHaveBeenCalledWith({
      action: `${previousTool} --> ${tool}`,
      properties: {category: 'Tool Changed'}
    });
  }));
});
