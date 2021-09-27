import React from 'react';
import UserProvider from '../components/Providers/UserProvider';
import Home from '../components/HomeShell/Home';

const Index = () => (
  <UserProvider>
    <Home />
  </UserProvider>
);

export default Index;
