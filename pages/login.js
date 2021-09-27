import React from 'react';
import { Center } from '@chakra-ui/react';
import Layout from '../components/Global/Layout';
import LoginForm from '../components/Login/LoginForm';

const LoginPage = () => (
  <Layout>
    <Center paddingTop={{ base: '5%' }}>
      <LoginForm />
    </Center>
  </Layout>
);

export default LoginPage;
