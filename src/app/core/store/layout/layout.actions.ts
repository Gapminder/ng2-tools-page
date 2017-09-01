import { Action } from '@ngrx/store';

export class SwitchMobileMenuVisibility implements Action {
  static TYPE = 'SwitchMobileMenuVisibility';
  type: string = SwitchMobileMenuVisibility.TYPE;

  constructor(public hide: boolean = false) {
  }
}

export class SetLanguageChooserVisibility implements Action {
  static TYPE = 'SetLanguageChooserVisibility';
  type: string = SetLanguageChooserVisibility.TYPE;

  constructor(public visible: boolean) {
  }
}

export class SwitchLanguageChooserVisibility implements Action {
  static TYPE = 'SwitchLanguageChooserVisibility';
  type: string = SwitchLanguageChooserVisibility.TYPE;
}

export class EnableEmbeddedMode implements Action {
  static TYPE = 'EnableEmbeddedMode';
  type: string = EnableEmbeddedMode.TYPE;

  constructor(public embedded: boolean = false) {
  }
}

export class SelectMenuItem implements Action {
  static TYPE = 'SelectMenuItem';
  type: string = SelectMenuItem.TYPE;

  constructor(public menuItem: any) {
  }
}

export class FlashAvailabilityDetermined implements Action {
  static TYPE = 'FlashAvailabilityDetermined';
  type: string = FlashAvailabilityDetermined.TYPE;

  constructor(public isFlashAvailable: boolean = false) {
  }
}

export type LayoutActions = SwitchMobileMenuVisibility
  | SetLanguageChooserVisibility
  | SwitchLanguageChooserVisibility
  | EnableEmbeddedMode
  | SelectMenuItem
  | FlashAvailabilityDetermined
