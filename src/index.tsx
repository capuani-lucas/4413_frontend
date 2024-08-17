import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.scss';
import Example from 'components/Example';
import reportWebVitals from './reportWebVitals';

import Login from 'components/Login/Login';
import Signup from 'components/Signup/Signup';
import { Provider } from 'react-redux';
import { store } from 'store';
import AuthComponent from 'components/AuthComponent/AuthComponent';
import Catalog from 'components/Catalog/Catalog';
import Cart from 'components/Cart/Cart';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<AuthComponent />}>
          <Route index element={<Catalog />} />
          <Route path="cart" element={<Cart />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
