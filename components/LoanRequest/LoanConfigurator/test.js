import React from 'react';
import { render, screen, fireEvent } from '../../../test-utils';
import { UserContext } from '../../Providers/UserProvider';
import { LoanRequestFlowContext } from '../../Providers/LoanRequestFlowProvider';
import LoanConfigurator from './index';

describe('Loanconfigurator suite', () => {
  const renderWithProviders = (
    ui,
    { userProviderProps, loanRequestProviderProps, ...renderOptions }
  ) =>
    render(
      <UserContext.Provider value={{ ...userProviderProps }}>
        <LoanRequestFlowContext.Provider
          value={{ ...loanRequestProviderProps }}>
          {ui}
        </LoanRequestFlowContext.Provider>
      </UserContext.Provider>,
      renderOptions
    );

  test.skip(`Muestra las condiciones default del préstamo para un nuevo usuario prime`, async () => {
    const loanRequestProviderProps = {
      selectedLoanAmount: 500
    };

    const userProviderProps = {
      loanMaxAmount: 500
    };
    renderWithProviders(<LoanConfigurator />, {
      userProviderProps,
      loanRequestProviderProps
    });
    expect(screen.getByText('$500')).toBeInTheDocument();
    expect(screen.getByText('$400')).toBeInTheDocument();
    expect(screen.getByText('Otro')).toBeInTheDocument();
  });

  test.skip(`Si el usuario elige otro monto, la información se actualiza`, async () => {
    const loanRequestProviderProps = {
      selectedLoanAmount: 500
    };

    const userProviderProps = {
      loanMaxAmount: 500
    };
    renderWithProviders(<LoanConfigurator />, {
      userProviderProps,
      loanRequestProviderProps
    });
    const lowerAsk = screen.getByText('$400');
    fireEvent.click(lowerAsk);
  });
});
