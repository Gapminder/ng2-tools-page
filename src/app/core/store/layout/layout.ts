import VizabiMenuItems from '../../menu-items';

import {
  EnableEmbeddedMode,
  FlashAvailabilityDetermined,
  LayoutActions,
  SelectMenuItem,
  SetLanguageChooserVisibility,
  SwitchLanguageChooserVisibility,
  SwitchMobileMenuVisibility
} from './layout.actions';

export interface State {
  mobileMenuHidden: boolean;
  isLanguageSwitcherVisible: boolean;
  embedded: boolean;
  menuItems: any[];
  selectedMenuItem: any;
  isFlashAvailable: boolean;
}

const initialState: State = {
  mobileMenuHidden: true,
  isLanguageSwitcherVisible: false,
  embedded: false,
  menuItems: VizabiMenuItems.children,
  selectedMenuItem: null,
  isFlashAvailable: false
};

export function reducer(state: State = initialState, action: LayoutActions): State {
  switch (action.type) {
    case SwitchMobileMenuVisibility.TYPE: {
      const switchMobileMenuAction = (action as SwitchMobileMenuVisibility);
      return Object.assign({}, state, { mobileMenuHidden: switchMobileMenuAction.hide || !state.mobileMenuHidden });
    }
    case SetLanguageChooserVisibility.TYPE: {
      const setLanguageSwitcherVisibilityAction = (action as SetLanguageChooserVisibility);
      return Object.assign({}, state, { isLanguageSwitcherVisible: setLanguageSwitcherVisibilityAction.visible });
    }
    case SwitchLanguageChooserVisibility.TYPE: {
      return Object.assign({}, state, { isLanguageSwitcherVisible: !state.isLanguageSwitcherVisible });
    }
    case EnableEmbeddedMode.TYPE: {
      const act = action as EnableEmbeddedMode;
      return Object.assign({}, state, { embedded: act.embedded });
    }
    case SelectMenuItem.TYPE: {
      const act = action as SelectMenuItem;
      return Object.assign({}, state, { selectedMenuItem: state.selectedMenuItem === act.menuItem ? null : act.menuItem });
    }
    case FlashAvailabilityDetermined.TYPE: {
      const act = action as FlashAvailabilityDetermined;
      return Object.assign({}, state, { isFlashAvailable: act.isFlashAvailable });
    }
    default: {
      return state;
    }
  }
};

