import { Injectable } from '@angular/core';
import { get, isEmpty } from 'lodash-es';
import { environment } from '../../environments/environment';

interface GAWindow extends Window {
  dataLayer: [string, string | Date | Object, string | Date | Object | undefined] | undefined[];
}

declare var window: GAWindow;

// declare const gtag: any;

export interface GAReaderHookResponseData {
  data?: number;
  code: number | null;
  message: string;
  metadata: {
    endpoint: string;
  };
}

interface DDFQL {
  from: string;
  select: {
    key: string[];
    value: string[];
  };
}

const GA_EVENT = 'event';
const GA_CONFIG = 'config';
const GA_EVENT_ACTION_REQUEST = 'request';
const GA_EVENT_ACTION_RESPONSE = 'response';
const GA_EVENT_ACTION_ERROR = 'error';
const GA_EVENT_ACTION_MESSAGE = 'message';


@Injectable()
export class GoogleAnalyticsService {
  private dataLayer: any[];

  constructor() {
    if (isEmpty(window.dataLayer)) {
      window.dataLayer = [];
    }

    this.dataLayer = window.dataLayer;

    this.gtag('js', new Date());
    this.gtag('config', 'UA-111865431-1');
  }

  trackVizabiModelChangedEvent(currentStateFromUrl: string): void {
    this.gtag(GA_EVENT, currentStateFromUrl, {
      event_category: 'Vizabi Model Changed'
    });
  }

  trackToolChangedEvent(e: { from: string; to: string }): void {
    this.gtag(GA_EVENT, `${e.from} --> ${e.to}`, {
      event_category: 'Tool Changed'
    });
  }

  trackConceptChanges(event) {
    const { chartName, indicator, newConceptIndicator } = event;

    this.gtag(GA_EVENT, `set which: ${chartName} marker ${indicator}`, {
      event_category: 'concept',
      event_label: get(newConceptIndicator, `which`)
    });
  }

  trackEntitiesChanges(event) {
    const { chartName, geo } = event;

    this.gtag(GA_EVENT, `select entity: ${chartName} marker`, {
      event_category: 'entity',
      event_label: geo
    });
  }

  trackRequestEvent(query: DDFQL): void {
    this.gtag(GA_EVENT, GA_EVENT_ACTION_REQUEST, {
      event_category: getGAEventCategory(query)
      // event_label: ''
    });
  }

  trackResponseEvent(query: DDFQL, event): void {
    const { responseData, endpoint, homepoint } = event;
    this.gtag(GA_EVENT, GA_EVENT_ACTION_RESPONSE, {
      event_category: getGAEventCategory(query),
      event_label: `rows: ${responseData}; endpoint: ${endpoint}; homepoint: ${homepoint}`
    });
  }

  trackExceptionEvent({ userId = '(empty)', endpoint, homepoint, error }): void {
    this.gtag(GA_EVENT, GA_EVENT_ACTION_ERROR, {
      // event_category: this.getGAEventCategory(query),
      description: `userId: ${userId}; endpoint: ${endpoint}; homepoint: ${homepoint}; error: ${error}`,
      fatal: true
    });
  }

  trackMessageEvent({ userId = '(empty)', endpoint, homepoint, message }): void {
    this.gtag(GA_EVENT, GA_EVENT_ACTION_MESSAGE, {
      // event_category: this.getGAEventCategory(query),
      description: `userId: ${userId}; endpoint: ${endpoint}; homepoint: ${homepoint}; message: ${message}`,
      fatal: false
    });
  }

  trackUserId(): void {
    this.gtag(GA_CONFIG, environment.generalTrackerId, {
      user_id: 'USER_ID'
    });
  }

  trackPage(path: string): void {
    // this.angulartics2.pageTrack.next({ path });
  }

  gtag(...args): void {
    console.log(JSON.stringify(args));
    this.dataLayer.push(args);
  }
}

export const getGAEventCategory = (query: DDFQL): string => {
  const { from, select: { value, key } } = query;

  return `${from}: ${value.join(',') || '(empty)'};${key.join(',') || '(empty)'}`;
};
