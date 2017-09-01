import { Action } from '@ngrx/store';
import { Language } from './language';

export class ChangeLanguage implements Action {
  static TYPE = 'ChangeLanguage';
  type: string = ChangeLanguage.TYPE;

  constructor(public lang: Language) {
  }
}

export class DetectLanguage implements Action {
  static TYPE = 'DetectLanguage';
  type: string = DetectLanguage.TYPE;
}

export type LanguageActions = ChangeLanguage | DetectLanguage;
