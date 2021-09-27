import React from 'react';
import { act, render, screen, fireEvent } from '../../../test-utils';
import LoginForm from './index';

describe('LoginForm suite', () => {
  test('form fails if submitted without information', async () => {
    render(<LoginForm />);
    const password = await screen.findByLabelText('Password');
    const email = await screen.findByLabelText('Email');

    await act(async () => {
      fireEvent.input(password, { target: { value: '' } });
      fireEvent.input(email, { target: { value: '' } });
      fireEvent.submit(await screen.findByRole('button'));

      // In theory, findByTestId must be avoided if possible, but I could not
      // make it work using findByText or any other sensible alternative. So
      // I'll move on and solve for that later.
      const emailError = await screen.findByTestId('missing-email');
      const passwordError = await screen.findByTestId('missing-password');

      expect(emailError).toBeInTheDocument();
      expect(passwordError).toBeInTheDocument();
    });
  });

  test('form fails if submitted without a valid email', async () => {
    render(<LoginForm />);
    const email = await screen.findByLabelText('Email');
    const password = await screen.findByLabelText('Password');

    await act(async () => {
      fireEvent.input(email, { target: { value: '' } });
      fireEvent.input(password, { target: { value: 'p455wd' } });
      fireEvent.submit(await screen.findByRole('button'));

      const emailError = await screen.findByTestId('missing-email');

      expect(emailError).toBeInTheDocument();
    });
  });

  test('form fails if submitted without a valid password', async () => {
    render(<LoginForm />);
    const email = await screen.findByLabelText('Email');
    const password = await screen.findByLabelText('Password');

    await act(async () => {
      fireEvent.input(email, { target: { value: 'Amet.Alvirde@gmail.com' } });
      fireEvent.input(password, { target: { value: '' } });
      fireEvent.submit(await screen.findByRole('button'));

      const emailError = await screen.findByTestId('missing-password');

      expect(emailError).toBeInTheDocument();
    });
  });
});

// Aparentemente según todas las fuentes que he consultado, no se hace prueba
// a partir de aquí porque después del submit se desmonta todo, pero simplemente
// en este test, se asume que se presiona el botón y no pasa nada más. Así que
// el test de login incorrecto, se encuentra en el test del archivo:
// pages/api/login.js
