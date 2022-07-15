import React from 'react';
import Example from 'components/Example';
import './styles/home.scss';
import { Link, Outlet } from 'react-router-dom';

export default function Home(): JSX.Element {
  return (
    <div className="home">
      hey1
      <nav
        style={{
          borderBottom: 'solid 1px',
          paddingBottom: '1rem',
        }}
      >
        <Link to="/example">Example</Link>
      </nav>
      <Outlet />
      <h1>hey</h1>
    </div>
  );
}
