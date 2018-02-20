describe('search', () => {
  const urls = ['http://localhost:8000', 'http://localhost:8000/test-page-01'];
  urls.forEach(createTestSearch(describe, it));
});

function createTestSearch(describe, it) {
  return url => {
    describe(`searching on page (${url})`, () => {
      beforeEach(() => {
        cy.visit(url);
      });
      describe('when searching and then deleting search criteria', () => {
        it('it show no navigation items', () => {
          cy.get('nav dd').should('have.length', 2);
          cy
            .get('input')
            .type('one')
            .clear();
          cy.get('nav dd').should('have.length', 2);
        });
      });

      describe('when searching that yields results', () => {
        it('it filters the navigation to show only pages with keywords matching search criteria', () => {
          cy.get('nav dd').should('have.length', 2);

          cy.get('input').type('one');
          cy.get('nav dd').should('have.length', 1);
          cy.get('nav dd').contains('Test Page 1');
        });
      });

      describe('when searching with criteria that yields no results', () => {
        it('it show no navigation items', () => {
          cy.get('nav dd').should('have.length', 2);

          cy.get('input').type('no results');
          cy.get('nav dd').should('have.length', 0);
        });
      });
    });
  };
}
