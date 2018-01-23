import Link from 'gatsby-link';
import React from 'react';

const NavigationItem = ({ depth, href, value }) => (
  <dd className={`depth-${depth}`}>
    <Link to={href}>{value}</Link>
  </dd>
);

NavigationItem.defaultProps = {
  depth: 0,
};

export default NavigationItem;
