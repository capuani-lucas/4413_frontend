import React from 'react';
import { Link } from 'react-router-dom';
import './styles/example.scss';

export default function Example(): JSX.Element {
  return (
    <div className="example">
      Example Page
      <nav
        style={{
          borderBottom: 'solid 1px',
          paddingBottom: '1rem',
        }}
      >
        <Link to="/">Home</Link>
      </nav>
    </div>
  );
}
