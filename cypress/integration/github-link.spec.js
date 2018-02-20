describe('repo ribbon link', () => {
  const urls = [
    'http://localhost:8000',
    'http://localhost:8000/test-page-01',
    'http://localhost:8000/non-existant-page',
  ];
  urls.forEach(createTestForRibbonRepoLinkOnPage(describe, it));
});
function createTestForRibbonRepoLinkOnPage(describe, it) {
  return url => {
    describe(`when viewing a page (${url})`, () => {
      it('contains a ribbon that links to the plugin repo', () => {
        cy.visit(url);
        const repoLink =
          'a[href="https://github.com/andrew-codes/gatsby-plugin-elasticlunr-search"]';
        const ribbonImage =
          'img[alt="Fork me on GitHub"][src="https://camo.githubusercontent.com/e7bbb0521b397edbd5fe43e7f760759336b5e05f/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f677265656e5f3030373230302e706e67"]';
        cy
          .get(repoLink)
          .children(ribbonImage)
          .should('be.visible');
        cy
          .get(ribbonImage)
          .should('have.css', 'borderWidth', '0px')
          .should('have.css', 'position', 'absolute')
          .should('have.css', 'top', '0px')
          .should('have.css', 'right', '0px');
      });
    });
  };
}
