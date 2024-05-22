// schema/resolvers.js

const books = require('../data/books');

const resolvers = {
  Query: {
    books: () => books,
    book: (_, { id }) => books.find(book => book.id === id),
  },
};

module.exports = resolvers;
