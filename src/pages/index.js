import graphql from 'graphql-tag';
import Helmet from 'react-helmet';
import React from 'react';
import VerticalNavigationList from '../components/VerticalNavigationList';

const App = ({ data: { allMarkdownRemark, site, siteSearchIndex } }) => (
  <div className={'master-detail-container'}>
    <Helmet title={`Home - ${site.siteMetadata.title}`} />
    <div className={'master-pane'}>
      <VerticalNavigationList
        currentSlug={'/'}
        edges={allMarkdownRemark.edges}
        searchData={siteSearchIndex}
      />
    </div>
    <div className={'detail-pane'}>
      <h1>Demo Site for Gatsby Search Plugin</h1>
      <p>
        Welcome to demo site for the
        <a href="https://github.com/andrew-codes/gatsby-plugin-elasticlunr-search">
          gatsby-plugin-elasticlunr-search plugin
        </a>.
      </p>
      <p>
        Test page 1 and Page 2 are <strong>indexed by title</strong>, as seen in
        the nav menu to the left, and by <strong>keyword</strong>. Try searching
        for "<strong>one</strong>", "<strong>two</strong>" or "<strong>
          three
        </strong>". The words "one" and "two" are keywords associated with Test
        page 1 and "two" and "three" are associated with Page 2.
      </p>
      <p>Of course you can also try searching by words matching the title.</p>
    </div>
  </div>
);
export default App;

export const query = graphql`
  query IndexPageQuery {
    site {
      siteMetadata {
        title
      }
    }
    siteSearchIndex {
      index
    }
    allMarkdownRemark {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
          }
          headings {
            depth
            value
          }
        }
      }
    }
  }
`;
