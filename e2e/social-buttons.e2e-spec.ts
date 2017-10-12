import { browser } from 'protractor';

import { Header } from './pages/components/header.e2e-component';
import { _$, ExtendedElementFinder } from './helpers/ExtendedElementFinder';

const header: Header = new Header();

describe('Social media buttons', () => {
  const mailToLink = 'mailto:?subject=Gapminder&body=http%3A%2F%2Fwww.gapminder.org%2Ftools%2F';

  const tweetStatus: ExtendedElementFinder = _$('#status');
  const twitterUrl = 'https://twitter.com/intent/tweet?original_referer=http%3A%2F%2Fwww.gapminder.org&related=Gapminder&text=Gapminder&tw_p=tweetbutton&url=http%3A%2F%2Fwww.gapminder.org%2Ftools%2F';
  const twitterContent = 'Gapminder http://www.gapminder.org/tools/';

  const faceBookForm: ExtendedElementFinder = _$('#login_form');
  const facebookUrl = 'https://www.facebook.com/login.php?skip_api_login=1&api_key=966242223397117&signed_next=1&next=https%3A%2F%2Fwww.facebook.com%2Fsharer%2Fsharer.php%3Fu%3Dhttp%253A%252F%252Fwww.gapminder.org%252Ftools%252F%26t&cancel_url=https%3A%2F%2Fwww.facebook.com%2Fdialog%2Freturn%2Fclose%3Ferror_code%3D4201%26error_message%3DUser%2Bcanceled%2Bthe%2BDialog%2Bflow%23_%3D_&display=popup&locale=';
  const facebookFormAction = 'login_attempt=1&next=https%3A%2F%2Fwww.facebook.com%2Fsharer%2Fsharer.php%3Fu%3Dhttp%253A%252F%252Fwww.gapminder.org%252Ftools%252F%26t';

  beforeAll(async() => {
    await browser.get('/');
  });

  beforeEach(async() => {
    await closeSocialTabAndSwitchToDefault();
  });

  it('mail-to', async() => {
    expect(await header.mailButtonDesktop.safeGetAttribute('href')).toEqual(mailToLink);
  });

  it('twitter', async() => {
    await header.twitterSocialDesktop.safeClick();
    const handles = await browser.getAllWindowHandles();
    await browser.switchTo().window(handles[1]);

    expect(await tweetStatus.safeGetText()).toEqual(twitterContent);
    expect(await browser.getCurrentUrl()).toEqual(twitterUrl);
  });

  it('facebook', async() => {
    await header.facebookSocialDesktop.safeClick();
    const handles = await browser.getAllWindowHandles();
    await browser.switchTo().window(handles[1]);

    expect(await faceBookForm.safeGetAttribute('action')).toContain(facebookFormAction);
    expect(await browser.getCurrentUrl()).toContain(facebookUrl);
  });

  /**
   * selenium can get text only from prompt but not from prompt input
   * and issue with mobile - https://github.com/Gapminder/ng2-tools-page/issues/76
   * something will be changed here
   */
  /*  xit('plane icon', async() => {
      const alertText = 'tools/#_chart-type=bubbles';

      await header.icoplaneSocialDesktop.safeClick();

      const alertDialog = browser.switchTo().alert();

      await expect(alertDialog.getText()).toContain(alertText);
    });
    xit('iframe icon', async() => {
      const alertText = 'tools/#_chart-type=bubbles';

      await header.icocodeSocialDesktop.safeClick();

      const alertDialog = browser.switchTo().alert();

      await expect(alertDialog.getText()).toContain(alertText);
    });*/
});

async function closeSocialTabAndSwitchToDefault() {
  const handles = await browser.getAllWindowHandles();

  if (handles.length > 1) {
    const socialTab = handles[1];
    const defaultTab = handles[0];

    await browser.switchTo().window(socialTab);
    await browser.close();
    await browser.switchTo().window(defaultTab);
  }
}
