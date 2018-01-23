import PropTypes from 'prop-types';
import qs from 'qs';
import React, { Component } from 'react';
import { Index } from 'elasticlunr';

const getSearch = ({ location }) => {
  if (!location) return '';
  if (!location.search) return '';

  const query = location.search.substring(1);
  const parsed = qs.parse(query);
  if (!parsed.q) return '';
  return parsed.q;
};

export default class Search extends Component {
  constructor(props, context) {
    super(props, context);

    this.updateQuery = evt => {
      const text = evt.target.value;
      const newQuery = qs.stringify({ q: text }, { format: 'RFC1738' });
      const hits = this.getHits(text);
      this.props.onSearch(hits);
      this.setState(s => {
        return {
          ...s,
          hits,
          query: text,
        };
      });
    };

    const query = getSearch(props);
    this.state = {
      query,
      hits: this.getHits(query),
    };
  }

  createIndex() {
    this.index = Index.load(this.props.data.index);
  }

  getHits(query) {
    if (!query) return [];

    if (!this.index) this.createIndex();
    const hits = this.index.search(query);
    return hits.map(({ ref }) => this.index.documentStore.getDoc(ref));
  }

  render() {
    const { query, hits } = this.state;

    return (
      <div>
        <input type="text" value={query} onChange={this.updateQuery} />
      </div>
    );
  }
}

Search.propTypes = {
  data: PropTypes.shape({
    index: PropTypes.object.isRequired,
  }).isRequired,
  onSearch: PropTypes.func.isRequired,
};
