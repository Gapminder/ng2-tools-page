import { browser, ExpectedConditions as EC } from 'protractor';

import { Header } from './pages/components/header.e2e-component';
import { LineChart } from './pages/line-chart.po';
import { _$, ExtendedElementFinder } from './helpers/ExtendedElementFinder';

const lineChart: LineChart = new LineChart();
const header: Header = new Header();

describe('Social media buttons', () => {
  const mailBasic = 'mailto:?subject=Gapminder';
  const mailState = '';

  const tweetStatus: ExtendedElementFinder = _$('#status');
  const twitterUrl = 'https://twitter.com/intent/tweet?original_referer=';
  const twitterContent = 'Gapminder ';

  const faceBookForm: ExtendedElementFinder = _$('#login_form');
  const facebookUrl = 'https://www.facebook.com/login.php?skip_api_login=1&api_key=966242223397117&signed_next=1&next=https%3A%2F%2Fwww.facebook.com%2Fsharer%2Fsharer.php';
  const facebookFormAction = '/login.php?login_attempt=1&next=https%3A%2F%2Fwww.facebook.com%2Fsharer%2Fsharer.php';

  beforeAll(async() => {
    await browser.get('./');
  });

  beforeEach(async() => {
    await closeSocialTabAndSwitchToDefault();
  });

  it('mail-to', async() => {
    await browser.wait(EC.visibilityOf(header.mailButtonDesktop));

    expect(await header.mailLinkDesktop.getAttribute('href')).toContain(mailBasic);
  });

  xit('Mail-to include state in subject', async() => {
    // there will be hidden button to activate url changing
    await lineChart.openChart();
    await lineChart.selectLine('China');
    await header.mailButtonDesktop.click();

    expect(await header.mailLinkDesktop.safeGetAttribute('href')).toContain(mailBasic);
    expect(await header.mailLinkDesktop.safeGetAttribute('href')).toContain(mailState);
  });

  it('twitter', async() => {
    await header.twitterSocialDesktop.safeClick();
    const handles = await browser.getAllWindowHandles();
    await browser.switchTo().window(handles[1]);

    await browser.wait(EC.visibilityOf(tweetStatus), 10000, 'tweet status');
    // expect(await tweetStatus.safeGetText()).toContain('Gapminder '); // this will not work on localhost
    expect(await browser.getCurrentUrl()).toContain(twitterUrl);
    expect(await browser.getCurrentUrl()).toContain('Gapminder');
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
