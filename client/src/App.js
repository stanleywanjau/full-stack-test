import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import client from './apolloClient';
import BookList from './components/BookList';
import BookView from './components/BookView';
import TokenView from './components/TokenView';
import './App.css';

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="container">
        
          <Routes>
            <Route path="/" element={<BookList />} />
            <Route path="/book/:id" element={<BookView />} />
            <Route path="/token/:value" element={<TokenView />} />
          </Routes>
      </div>
    </ApolloProvider>
  );
}

export default App;
