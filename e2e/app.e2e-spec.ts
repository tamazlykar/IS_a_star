import { AlgorithmAAsteriskPage } from './app.po';

describe('algorithm-a-asterisk App', function() {
  let page: AlgorithmAAsteriskPage;

  beforeEach(() => {
    page = new AlgorithmAAsteriskPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
