import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import UsersList from './UserOperations/UsersList';

export default function App() {
  return (
    <Provider store={store}>
      <UsersList />
    </Provider>
  );
}
