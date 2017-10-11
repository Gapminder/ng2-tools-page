import { Action } from '@ngrx/store';

export class PromptForSharingLink implements Action {
  static TYPE = 'PromptForSharingLink';
  type: string = PromptForSharingLink.TYPE;
}

export class PromptForEmbeddedUrl implements Action {
  static TYPE = 'PromptForEmbeddedUrl';
  type: string = PromptForEmbeddedUrl.TYPE;
}

