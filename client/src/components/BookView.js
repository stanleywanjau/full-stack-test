import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { useParams, Link } from 'react-router-dom';

const GET_BOOK = gql`
  query GetBook($id: ID!) {
    book(id: $id) {
      id
      title
      author
      pages {
        pageIndex
        content
        tokens {
          position
          value
        }
      }
    }
  }
`;

function BookView() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_BOOK, { variables: { id } });
  const [currentPage, setCurrentPage] = useState(0);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const pages = data.book.pages;
  const totalPages = pages.length;

  const handleNext = () => {
    if (currentPage < totalPages - 2) {
      setCurrentPage(currentPage + 2);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 2);
    }
  };

  const renderPageContent = (page) => {
    const words = page.content.split(/(\s+)/).map((word, index) => {
      const token = page.tokens.find((token) => token.position[0] <= index && index <= token.position[1]);
      return token ? (
        <Link key={index} to={`/token/${token.value}`} className="word-link">
          {word}
        </Link>
      ) : (
        <span key={index}>{word}</span>
      );
    });

    return words;
  };

  return (
    <div>
      <h1>{data.book.title}</h1>
      <h2>{data.book.author}</h2>
      <div className="book-container">
        {[0, 1].map((offset) => {
          const page = pages[currentPage + offset];
          return page ? (
            <div key={page.pageIndex} className="page">
              <h3>Page {page.pageIndex + 1}</h3>
              <p>{renderPageContent(page)}</p>
            </div>
          ) : (
            <div key={offset} className="page"></div>
          );
        })}
      </div>
      <div className="navigation-buttons">
        <button onClick={handlePrevious} disabled={currentPage === 0}>
          Previous
        </button>
        <button onClick={handleNext} disabled={currentPage >= totalPages - 2}>
          Next
        </button>
      </div>
    </div>
  );
}

export default BookView;
