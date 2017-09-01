import { Action } from '@ngrx/store';

export class TrackGaToolChangeEvent implements Action {
  static TYPE = 'TrackGaToolChangeEvent';
  type: string = TrackGaToolChangeEvent.TYPE;

  constructor(public fromTool: string, public toTool: string) {
  }
}

export class TrackGaVizabiModelChangeEvent implements Action {
  static TYPE = 'TrackGaVizabiModelChangeEvent';
  type: string = TrackGaVizabiModelChangeEvent.TYPE;

  constructor(public path: string) {
  }
}

export class TrackGaPageEvent implements Action {
  static TYPE = 'TrackGaPageEvent';
  type: string = TrackGaPageEvent.TYPE;

  constructor(public path: string) {
  }
}
