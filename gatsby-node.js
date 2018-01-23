const fs = require('fs');
const path = require('path');
const { createFilePath } = require(`gatsby-source-filesystem`);

const rootDir = path.resolve(__dirname);

exports.onCreateNode = ({ node, getNode, boundActionCreators }) => {
  const { createNodeField } = boundActionCreators;
  if (node.internal.type === `MarkdownRemark`) {
    const slug = node.frontmatter.slug
      ? node.frontmatter.slug
      : createFilePath({ node, getNode, basePath: `docs` });
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    });

    const template = node.frontmatter.template
      ? node.frontmatter.template
      : `default`;
    createNodeField({
      node,
      name: `template`,
      value: template,
    });
  }
};

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators;
  return new Promise(resolve => {
    graphql(`
      {
        allMarkdownRemark {
          edges {
            node {
              fields {
                slug
                template
              }
            }
          }
        }
      }
    `).then(result => {
      result.data.allMarkdownRemark.edges.map(({ node }) => {
        createPage({
          path: node.fields.slug,
          component: path.join(
            rootDir,
            `src`,
            `templates`,
            `${node.fields.template}.js`,
          ),
          context: {
            slug: node.fields.slug,
          },
        });
      });
      resolve();
    });
  });
};
