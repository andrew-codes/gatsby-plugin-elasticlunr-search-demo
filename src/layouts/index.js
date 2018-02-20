import graphql from 'graphql-tag';
import Helmet from 'react-helmet';
import Link from 'gatsby-link';
import PropTypes from 'prop-types';
import React from 'react';

import './index.css';

const Header = () => (
  <div className="top-header">
    <div className="header-text">
      <h1>
        <Link to="/">Home</Link>
      </h1>
    </div>
    <a href="https://github.com/andrew-codes/gatsby-plugin-elasticlunr-search">
      <img
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          borderWidth: 0,
        }}
        src="https://camo.githubusercontent.com/e7bbb0521b397edbd5fe43e7f760759336b5e05f/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f677265656e5f3030373230302e706e67"
        alt="Fork me on GitHub"
        data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_green_007200.png"
      />
    </a>
  </div>
);

const TemplateWrapper = ({ children, data: { site } }) => (
  <div>
    <Helmet
      title={site.siteMetadata.title}
      meta={[{ name: 'description', content: site.siteMetadata.description }]}
    />
    <Header />
    <div>{children()}</div>
  </div>
);

TemplateWrapper.propTypes = {
  children: PropTypes.func,
};

export default TemplateWrapper;
export const query = graphql`
  query TemplateQuery {
    site {
      siteMetadata {
        description
        title
      }
    }
  }
`;
