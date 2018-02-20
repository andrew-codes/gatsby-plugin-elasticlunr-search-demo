describe('search on homepage', () => {
  describe('when searching and then deleting search criteria', () => {
    beforeEach(() => {
      cy.visit('http://localhost:8000');
    });

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
    beforeEach(() => {
      cy.visit('http://localhost:8000');
    });

    it('it filters the navigation to show only pages with keywords matching search criteria', () => {
      cy.get('nav dd').should('have.length', 2);

      cy.get('input').type('one');
      cy.get('nav dd').should('have.length', 1);

      cy
        .get('input')
        .clear()
        .type('two');
      cy.get('nav dd').should('have.length', 2);
    });
  });

  describe('when searching with criteria that yields no results', () => {
    beforeEach(() => {
      cy.visit('http://localhost:8000');
    });

    it('it show no navigation items', () => {
      cy.get('nav dd').should('have.length', 2);

      cy.get('input').type('no results');
      cy.get('nav dd').should('have.length', 0);
    });
  });
});

describe('search on search result pages', () => {
  describe('when searching and then deleting search criteria', () => {
    beforeEach(() => {
      cy.visit('http://localhost:8000/test-page-01/');
    });

    it('it show no navigation items', () => {
      cy.get('nav dd').should('have.length', 2);
      cy
        .get('input')
        .type('one')
        .clear();
      cy.get('nav dd').should('have.length', 2);
    });
  });

  describe.only('when searching that yields results', () => {
    beforeEach(() => {
      cy.visit('http://localhost:8000/test-page-01/');
    });

    it('it filters the navigation to show only pages with keywords matching search criteria', () => {
      cy.get('nav dd').should('have.length', 2);

      cy.get('input').type('one');
      cy.get('nav dd').should('have.length', 1);

      cy
        .get('input')
        .clear()
        .type('two');
      cy.get('nav dd').should('have.length', 2);
    });
  });

  describe('when searching with criteria that yields no results', () => {
    beforeEach(() => {
      cy.visit('http://localhost:8000/test-page-01/');
    });

    it('it show no navigation items', () => {
      cy.get('nav dd').should('have.length', 2);

      cy.get('input').type('no results');
      cy.get('nav dd').should('have.length', 0);
    });
  });
});
