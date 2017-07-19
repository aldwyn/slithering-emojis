import { ChromediaSnakePage } from './app.po';

describe('chromedia-snake App', () => {
  let page: ChromediaSnakePage;

  beforeEach(() => {
    page = new ChromediaSnakePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
