import React from 'react';
// import { act, render, screen, fireEvent } from '../../test-utils';
import { render } from '../../../test-utils';
import { UserContext } from '../../Providers/UserProvider';
import LoanRequestFlowProvider from '../../Providers/LoanRequestFlowProvider';
import LoanDetails from './index';

const renderWithProviders = (
  ui,
  { userProviderProps, loanRequestProviderProps, ...renderOptions }
) =>
  render(
    <UserContext.Provider {...userProviderProps}>
      <LoanRequestFlowProvider {...loanRequestProviderProps}>
        {ui}
      </LoanRequestFlowProvider>
    </UserContext.Provider>,
    renderOptions
  );

describe('LoanDetails suite', () => {
  test.skip(`Muestra LoanConfirmation cuando se le pica al botón`, async () => {
    renderWithProviders(<LoanDetails />);
  });
});
