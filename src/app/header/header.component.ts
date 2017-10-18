import { Component, HostListener, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  getAllLanguages,
  getAllMenuItems,
  getSelectedLanguage,
  getSelectedMenuItem, getSelectedTool,
  isLanguageSwitcherVisible,
  isMobileMenuHidden,
  State
} from '../core/store';
import { Observable } from 'rxjs/Observable';
import {
  SelectMenuItem,
  SetLanguageChooserVisibility,
  SwitchLanguageChooserVisibility,
  SwitchMobileMenuVisibility,
} from '../core/store/layout/layout.actions';
import { Language } from '../core/store/language/language';
import { ChangeLanguage } from '../core/store/language/language.actions';

import { PromptForSharingLink, PromptForEmbeddedUrl } from '../core/store/user-interaction/user-interaction.actions';
import { SelectTool } from '../core/store/tools/tools.actions';
import { TranslateService } from '@ngx-translate/core';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.styl']
})
export class HeaderComponent {
  allLanguages$: Observable<ReadonlyArray<Language>>;
  selectedLanguage$: Observable<Language>;
  selectedTool$: Observable<string>;
  isLanguageSwitcherVisible$: Observable<boolean>;

  menuItems$: Observable<any[]>;
  isMobileMenuHidden$: Observable<boolean>;
  isMobileMenuHidden: boolean;
  selectedMenuItem$: Observable<any>;

  constructor(private store: Store<State>, private translate: TranslateService) {
    this.menuItems$ = this.store.select(getAllMenuItems);
    this.selectedMenuItem$ = this.store.select(getSelectedMenuItem);
    this.isMobileMenuHidden$ = this.store.select(isMobileMenuHidden);
    this.allLanguages$ = this.store.select(getAllLanguages);
    this.selectedTool$ = this.store.select(getSelectedTool);
    this.selectedLanguage$ = this.store.select(getSelectedLanguage);
    this.isLanguageSwitcherVisible$ = this.store.select(isLanguageSwitcherVisible);

    this.isMobileMenuHidden$.subscribe(value => {
      this.isMobileMenuHidden = value;
    });
  }

  selectMenuItem(item: any): void {
    this.store.dispatch(new SelectMenuItem(item));
  }

  switchMobileMenuVisibility(): void {
    this.store.dispatch(new SwitchMobileMenuVisibility());
  }

  changeLanguage(language: Language): void {
    this.store.dispatch(new ChangeLanguage(language));
    this.translate.use(language.key);
  }

  hideLanguageChooser() {
    this.store.dispatch(new SetLanguageChooserVisibility(false));
  }

  switchLanguageChooser() {
    this.store.dispatch(new SwitchLanguageChooserVisibility());
  }

  getEmbeddedUrl(): void {
    this.store.dispatch(new PromptForEmbeddedUrl());
  }

  shareLink(): void {
    this.store.dispatch(new PromptForSharingLink());
  }

  selectTool(selectedTool: string) {
    this.store.dispatch(new SelectTool(selectedTool));
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    if (!this.isMobileMenuHidden) {
      this.switchMobileMenuVisibility();
    }
  }
}
