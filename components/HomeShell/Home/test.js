import React from 'react';
import { render, screen } from '../../../test-utils';
import Home from './index';
import { UserContext } from '../../Providers/UserProvider';

const renderWithProvider = (ui, { providerProps, ...renderOptions }) =>
  render(
    <UserContext.Provider {...providerProps}>{ui}</UserContext.Provider>,
    renderOptions
  );

describe('Home suite', () => {
  test(`Muestra alerta de error cuando el usuario está banneado`, async () => {
    const providerProps = {
      value: {
        banned: true
      }
    };

    renderWithProvider(<Home />, { providerProps });
    const bannedAlert = await screen.findByRole('alert');

    expect(bannedAlert).toBeInTheDocument();
    expect(bannedAlert).toHaveTextContent('baniado');
  });

  test(`Muestra alerta de error cuando el usuario está inactivo`, async () => {
    const providerProps = {
      value: {
        inactive: true
      }
    };

    renderWithProvider(<Home />, { providerProps });
    const inactiveAlert = await screen.findByRole('alert');

    expect(inactiveAlert).toBeInTheDocument();
    expect(inactiveAlert).toHaveTextContent('inactivo');
  });

  test(`confirmEmail`, async () => {
    const providerProps = {
      value: {
        emailConfirm: true
      }
    };

    renderWithProvider(<Home />, { providerProps });

    const unverifiedEmailAlert = await screen.findByTestId(
      'unverified-email-alert'
    );

    expect(unverifiedEmailAlert).toBeInTheDocument();
    expect(unverifiedEmailAlert).toHaveTextContent('verificado');
  });

  test(`validationPending`, async () => {
    const providerProps = {
      value: {
        approved: false
      }
    };

    renderWithProvider(<Home />, { providerProps });

    const validationPendingAlert = await screen.findByTestId(
      'validation-pending-alert'
    );

    expect(validationPendingAlert).toBeInTheDocument();
    expect(validationPendingAlert).toHaveTextContent('validando');
  });

  test(`unpaidPrime`, async () => {
    const providerProps = {
      value: {
        unpaidPrime: true
      }
    };

    renderWithProvider(<Home />, { providerProps });

    const unpaidPrimeAlert = await screen.findByTestId('unpaid-prime-alert');

    expect(unpaidPrimeAlert).toBeInTheDocument();
    expect(unpaidPrimeAlert).toHaveTextContent('no ha pagado');
  });

  test(`primeWithActiveLoan`, async () => {
    const providerProps = {
      value: {
        primeWithActiveLoan: true
      }
    };

    renderWithProvider(<Home />, { providerProps });

    const primeWithActiveLoanAlert = await screen.findByTestId(
      'prime-with-active-loan-alert'
    );

    expect(primeWithActiveLoanAlert).toBeInTheDocument();
    expect(primeWithActiveLoanAlert).toHaveTextContent('prime préstamo activo');
  });

  test(`standardWithActiveLoan`, async () => {
    const providerProps = {
      value: {
        standardWithActiveLoan: true
      }
    };

    renderWithProvider(<Home />, { providerProps });

    const standardWithActiveLoanAlert = await screen.findByTestId(
      'standard-with-active-loan-alert'
    );

    expect(standardWithActiveLoanAlert).toBeInTheDocument();
    expect(standardWithActiveLoanAlert).toHaveTextContent(
      'standard préstamo activo'
    );
  });

  test(`noLoanTokens`, async () => {
    const providerProps = {
      value: {
        loanTokens: 0
      }
    };

    renderWithProvider(<Home />, { providerProps });

    const hasNoLoanTokensAlert = await screen.findByTestId(
      'has-no-loan-tokens-alert'
    );

    expect(hasNoLoanTokensAlert).toBeInTheDocument();
    expect(hasNoLoanTokensAlert).toHaveTextContent('no tienes gemas');
  });
});
