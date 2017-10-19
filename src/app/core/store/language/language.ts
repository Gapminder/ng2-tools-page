import { get } from 'lodash-es';
import { ChangeLanguage, LanguageActions } from './language.actions';

export abstract class Language {
  key: string;
  text: string;
}

export interface VizabiLocale {
  locale: { id: string, filePath?: any };
}

export interface State {
  lang: Language;
  locale: VizabiLocale;
  allLangs: ReadonlyArray<Language>;
}

export const DEFAULT_LANGUAGE: Language = {key: 'en', text: 'English'};

export const AVAILABLE_LANGUAGES: Language[] = [
  DEFAULT_LANGUAGE,
  {key: 'ar-SA', text: 'العربية'},
  {key: 'ru-RU', text: 'Русский'}
];

const initialState: State = {
  lang: DEFAULT_LANGUAGE,
  locale: null,
  allLangs: AVAILABLE_LANGUAGES
};

export function reducer(state: State = initialState, action: LanguageActions): State {
  switch (action.type) {
    case ChangeLanguage.TYPE: {
      const act = (action as ChangeLanguage);
      const urlLanguageKey = get(act.lang, 'key');
      const currentLanguage = state.lang;

      if (urlLanguageKey && currentLanguage && currentLanguage.key !== urlLanguageKey) {
        return {...state, ...{lang: act.lang, locale: toLocale(act.lang)}};
      }

      return state;
    }
    default: {
      return state;
    }
  }
}

function toLocale(language: Language): VizabiLocale {
  return {locale: {id: language.key}};
}
