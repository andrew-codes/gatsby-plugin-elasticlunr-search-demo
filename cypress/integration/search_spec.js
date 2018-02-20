describe('search', () => {
  const urls = ['http://localhost:8000', 'http://localhost:8000/test-page-01'];
  urls.forEach(createTestForSearch(describe, it));
});

function createTestForSearch(describe, it) {
  return url => {
    describe(`searching on page (${url})`, () => {
      const searchInput = '[role="search"] input[type="search"]';
      beforeEach(() => {
        cy.visit(url);
      });

      it('contains a field indicating that it is for searching', () => {
        cy.get(`${searchInput}[placeholder="search"]`);
      });

      describe('when searching and then deleting search criteria', () => {
        it('it show no navigation items', () => {
          cy.get('nav dd').should('have.length', 2);
          cy
            .get(searchInput)
            .type('one')
            .clear();
          cy.get('nav dd').should('have.length', 2);
        });
      });

      describe('when searching that yields results', () => {
        it('it filters the navigation to show only pages with keywords matching search criteria', () => {
          cy.get('nav dd').should('have.length', 2);

          cy.get(searchInput).type('one');
          cy.get('nav dd').should('have.length', 1);
          cy.get('nav dd').contains('Test Page 1');
        });
      });

      describe('when searching with criteria that yields no results', () => {
        it('it show no navigation items', () => {
          cy.get('nav dd').should('have.length', 2);

          cy.get(searchInput).type('no results');
          cy.get('nav dd').should('have.length', 0);
        });
      });
    });
  };
}
