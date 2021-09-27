import React, { useContext } from 'react';
import Head from 'next/head';
import { useColorMode, chakra } from '@chakra-ui/react';
import Navbar from '../Navbar';
import { UserContext } from '../../Providers/UserProvider';

const Layout = ({ children = 'default children' }) => {
  const { colorMode } = useColorMode();
  const backgroundColor = { light: 'gray.50', dark: 'gray.50' };
  const color = { light: 'gray.900', dark: 'gray.900' };
  // colors to be used on real dark mode
  // const color = { light: 'gray.900', dark: 'gray.50' };
  const user = useContext(UserContext);

  return (
    <>
      <Head>
        <title>Casham</title>
      </Head>
      {user?.isLoggedIn ? <Navbar /> : null}
      {!user?.isLoggedIn ? <Navbar publicContent /> : null}
      <chakra.main
        height="100vh"
        background={backgroundColor[colorMode]}
        color={color[colorMode]}>
        {children}
      </chakra.main>
    </>
  );
};

export default Layout;
