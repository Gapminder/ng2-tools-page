import { Action } from '@ngrx/store';

export class ChangeConfig implements Action {
  static TYPE = 'ChangeConfig';
  type: string = ChangeConfig.TYPE;

  constructor(public config: any, public client: string = null) {
  }
}

export class ChangeClient implements Action {
  static TYPE = 'ChangeClient';
  type: string = ChangeClient.TYPE;

  constructor(public client: string) {
  }
}

export class SelectTool implements Action {
  static TYPE = 'SelectTool';
  type: string = SelectTool.TYPE;

  constructor(public tool: any) {
  }
}

export class VizabiModelChanged implements Action {
  static TYPE = 'VizabiModelChanged';
  type: string = VizabiModelChanged.TYPE;

  constructor(public model: any, public isInnerChange = false) {
  }
}

export class VizabiInstanceCreated implements Action {
  static TYPE = 'VizabiInstanceCreated';
  type: string = VizabiInstanceCreated.TYPE;

  constructor(public vizabiInstance: any, public tool: string) {
  }
}

export type ToolsActions = ChangeConfig
  | SelectTool
  | ChangeConfig
  | VizabiModelChanged
  | VizabiInstanceCreated
