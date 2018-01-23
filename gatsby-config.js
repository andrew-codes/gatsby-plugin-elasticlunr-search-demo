const path = require(`path`);

module.exports = {
  siteMetadata: {
    title: `Gastby Plugin Elastic Lunr Search Demo`,
    description: `demo site for gastby-plugin-elasticlunr-search`,
  },
  plugins: [
    {
      resolve: `@andrew-codes/gatsby-plugin-elasticlunr-search`,
      options: {
        // Fields to index
        fields: ['title', 'keywords'],
        // How to resolve each field's value for a supported node type
        resolvers: {
          // For any node of type MarkdownRemark, list how to resolve the fields' values
          MarkdownRemark: {
            title: node => node.frontmatter.title,
            keywords: node => node.frontmatter.keywords,
          },
        },
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: path.resolve(__dirname, `docs`),
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [`gatsby-remark-prismjs`, `gatsby-remark-autolink-headers`],
      },
    },
  ],
};
