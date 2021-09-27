import React, { createContext } from 'react';
import useUser from '../../../lib/useUser';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const { user } = useUser({ redirectTo: '/login' });

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export default UserProvider;
