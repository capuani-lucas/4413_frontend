import React from 'react';
import './styles/home.scss';
import { useGetProductsQuery } from 'service/catalogAPI';
import { logout } from 'service/utils';

export default function Home(): JSX.Element {


  const { data, isLoading, error } = useGetProductsQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="home">
      hey1
      <nav
        style={{
          borderBottom: 'solid 1px',
          paddingBottom: '1rem',
        }}
      >
        <button
          onClick={() => logout()}
        >
          test
        </button>
      </nav>
      <h1>hey</h1>
    </div>
  );
}
