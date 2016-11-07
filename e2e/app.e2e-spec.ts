import { ToolsPagePage } from './app.po';

describe('tools-page App', function() {
  let page: ToolsPagePage;

  beforeEach(() => {
    page = new ToolsPagePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
