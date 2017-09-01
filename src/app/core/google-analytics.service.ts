import { Injectable } from '@angular/core';
import { Angulartics2 } from 'angulartics2';

@Injectable()
export class GoogleAnalyticsService {
  private angulartics2: Angulartics2;

  constructor(angulartics2: Angulartics2) {
    this.angulartics2 = angulartics2;
  }

  trackVizabiModelChangedEvent(currentStateFromUrl: string): void {
    this.angulartics2.eventTrack.next({
      action: currentStateFromUrl,
      properties: { category: 'Vizabi Model Changed' }
    });
  }

  trackToolChangedEvent(e: { from: string, to: string }): void {
    this.angulartics2.eventTrack.next({
      action: `${e.from} --> ${e.to}`,
      properties: { category: 'Tool Changed' }
    });
  }

  trackPage(path: string): void {
    this.angulartics2.pageTrack.next({ path });
  }
}
