import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Alert,
  AlertIcon,
  Button,
  Center,
  FormControl,
  FormLabel,
  Input
} from '@chakra-ui/react';
import fetchJson from '../../../lib/fetchJson';
import useUser from '../../../lib/useUser';

const LoginForm = () => {
  const { mutateUser } = useUser({
    redirectTo: '/',
    redirectIfFound: true
  });

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authError, setAuthError] = useState();

  const onSubmit = async data => {
    setIsSubmitting(true);
    try {
      await mutateUser(
        fetchJson('/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        })
      );
    } catch (error) {
      setIsSubmitting(false);
      if (error.message === 'Unauthorized') {
        setAuthError(true);
      }
    }
  };

  return (
    <Center>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl id="email">
          <FormLabel>Email</FormLabel>
          <Input
            {...register('email', {
              validate: email =>
                /^[^@]+@\w+(\.\w+)+\w$/.test(email) ||
                'El email es un campo obligatorio'
            })}
          />
        </FormControl>
        {errors.email && (
          <Alert role="alert" marginTop={{ base: '3%' }} status="error">
            <AlertIcon />
            <p data-testid="missing-email">{errors.email.message}</p>
          </Alert>
        )}
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            {...register('password', {
              required: 'La contraseña es un campo obligatorio'
            })}
          />
          {errors.password ? (
            <Alert role="alert" marginTop={{ base: '3%' }} status="error">
              <AlertIcon />
              <p data-testid="missing-password">{errors.password.message}</p>
            </Alert>
          ) : null}
        </FormControl>
        <Button
          isLoading={isSubmitting}
          colorScheme="green"
          width="100%"
          marginTop={{ base: '5%' }}
          loadingText="Iniciando sesión"
          size="md"
          type="submit">
          Login
        </Button>
        {authError ? (
          <Alert role="alert" marginTop={{ base: '3%' }} status="error">
            <AlertIcon />
            <p data-testid="auth-error">Email o contraseña incorrectos</p>
          </Alert>
        ) : null}
      </form>
    </Center>
  );
};

export default LoginForm;
