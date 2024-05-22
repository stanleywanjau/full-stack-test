// src/components/BookList.js

import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Link } from 'react-router-dom';

const GET_BOOKS = gql`
  query GetBooks {
    books {
      id
      title
      author
    }
  }
`;

function BookList() {
  const { loading, error, data } = useQuery(GET_BOOKS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <h1>Books</h1>
      <ul>
        {data.books.map(book => (
          <li key={book.id}>
            <Link to={`/book/${book.id}`}>{book.title} </Link> By { book.author}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookList;
