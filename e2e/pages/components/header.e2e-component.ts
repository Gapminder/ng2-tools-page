import { $, browser, ElementFinder } from 'protractor';
import { _$, ExtendedElementFinder } from '../../helpers/ExtendedElementFinder';

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
}
