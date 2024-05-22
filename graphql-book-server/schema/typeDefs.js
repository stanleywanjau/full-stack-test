// schema/typeDefs.js

const { gql } = require('apollo-server');

const typeDefs = gql`
  type Token {
    position: [Int]
    value: String
  }

  type Page {
    pageIndex: Int
    content: String
    tokens: [Token]
  }

  type Book {
    id: ID!
    title: String!
    author: String!
    pages: [Page]
  }

  type Query {
    books: [Book]
    book(id: ID!): Book
  }
`;

module.exports = typeDefs;
