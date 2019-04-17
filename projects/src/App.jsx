import React, { Component } from 'react';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import { UserProvider, UserConsumer } from './contexts/UserContext';

import './App.css';

class App extends Component {
  render() {
    return (
      <UserProvider>
        <UserConsumer>
          {({user}) => {
            return user ? <MainPage /> : <LoginPage />;
          }}
        </UserConsumer>
      </UserProvider>
    )
  }
}

export default App;
