import { $, browser, ElementFinder } from 'protractor';
import { _$, _$$, ExtendedElementFinder } from '../../helpers/ExtendedElementFinder';
import { promise } from 'selenium-webdriver';
import { waitForPageLoaded, waitForSpinner, waitForUrlToChange } from '../../helpers/helper';

export class Header {
  rootSelector: ElementFinder = $('.header');
  /**
   * Social buttons
   */
  socialDesktop: ExtendedElementFinder = _$('.social.desktop');
  mailButtonDesktop: ExtendedElementFinder = this.socialDesktop._$$('.mail.button').first();
  mailLinkDesktop: ExtendedElementFinder = this.socialDesktop._$$('app-social-buttons > a').first();
  twitterSocialDesktop: ExtendedElementFinder = this.socialDesktop._$$('.twitter.button').first();
  facebookSocialDesktop: ExtendedElementFinder = this.socialDesktop._$$('.facebook.button').first();
  icoplaneSocialDesktop: ExtendedElementFinder = this.socialDesktop._$$('.button.ico-plane').first();
  icocodeSocialDesktop: ExtendedElementFinder = this.socialDesktop._$$('.button.ico-code').first();

  socialMobile: ExtendedElementFinder = _$('[class="mobile"]');
  mailButtonMobile: ExtendedElementFinder = this.socialMobile._$$('.mail.button').first();
  twitterSocialMobile: ExtendedElementFinder = this.socialMobile._$$('.twitter.button').first();
  facebookSocialMobile: ExtendedElementFinder = this.socialMobile._$$('.facebook.button').first();
  icoplaneSocialMobile: ExtendedElementFinder = this.socialMobile._$$('.button.ico-plane').first();
  icocodeSocialMobile: ExtendedElementFinder = this.socialMobile._$$('.button.ico-code').first();

  chartSwitcherBtn: ExtendedElementFinder = _$('.chart-switcher');
  languageSwitcherBtn: ExtendedElementFinder = _$('.lang-wrapper');
  currentLanguage: ExtendedElementFinder = _$('.lang-current');
  englishLanguage: ExtendedElementFinder = _$$('app-language-switcher .selected li').first();
  rtlLanguage: ExtendedElementFinder = _$$('app-language-switcher .selected li').get(1);

  async switchToChart(chartUrl: string) {
    await this.chartSwitcherBtn.safeClick();
    await _$(`.chart-switcher-options [href='/tools/${chartUrl}']`).safeClick();
    await waitForUrlToChange();

    return await waitForPageLoaded();
  }

  changeLanguageToRtl(): Promise<void> {
    return this.changeLanguage(true);
  }

  changeLanguageToEng(): Promise<void> {
    return this.changeLanguage();
  }

  async changeLanguage(rtl?: boolean): Promise<void> {
    let language: ExtendedElementFinder;
    rtl ? language = this.rtlLanguage : language = this.englishLanguage;

    this.languageSwitcherBtn.safeClick();
    language.safeClick();
    await waitForUrlToChange();
    await waitForSpinner();
  }
}
