import { Action } from '@ngrx/store';

export class PromptForSharingLink implements Action {
  static TYPE = 'PromptForSharingLink';
  type: string = PromptForSharingLink.TYPE;
}

export class PromptForShortUrl implements Action {
  static TYPE = 'PromptForShortUrl';
  type: string = PromptForShortUrl.TYPE;
}

