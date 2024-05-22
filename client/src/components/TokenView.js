// src/components/TokenView.js

import React from 'react';
import { useParams } from 'react-router-dom';

function TokenView() {
  const { value } = useParams();
  return (
    <div>
      <h1>Token Value</h1>
      <p>{value}</p>
      <div className="navigation-buttons">

      <button onClick={() => window.history.back()}>Back</button>
      </div>
    </div>
  );
}

export default TokenView;
