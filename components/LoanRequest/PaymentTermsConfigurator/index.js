import React, { useContext, useEffect } from 'react';
import { Select } from '@chakra-ui/react';
import { LoanRequestFlowContext } from '../../Providers/LoanRequestFlowProvider';
import { UserContext } from '../../Providers/UserProvider';
import recalculateLoan from '../../../lib/recalculateLoan';

const PaymentTermsConfigurator = () => {
  const {
    setPaymentCalculations,
    selectedLoanAmount,
    setSelectedPaymentTerms
  } = useContext(LoanRequestFlowContext);

  const { fee, interestRate, extraPeriods } = useContext(UserContext);

  const maxTermsAvailable = Math.ceil(selectedLoanAmount / 500);

  const selectedPaymentTermsChanged = () => {
    const selectedValue = document.querySelector('#numberOfPayments');
    // setting it here so LoanConfigurator useEffect catches it and
    // recalculate the loan. But, we'll use the value of the select below
    // instead of selectedPaymentTerms to ensure no wrong calculation would
    // occur due to the async functions behavio

    setSelectedPaymentTerms(Number(selectedValue.value));
    setPaymentCalculations(
      recalculateLoan({
        newAmount: selectedLoanAmount + fee,
        terms: Number(selectedValue.value),
        fee,
        interestRate,
        extraPeriods
      })
    );
  };

  useEffect(() => {
    // Cannot be declared in the upper scope, because useEffect wins the race
    // and thows a null
    const selectedValue = document.querySelector('#numberOfPayments');
    selectedValue.value = maxTermsAvailable;
    setSelectedPaymentTerms(maxTermsAvailable);
  }, [selectedLoanAmount]);

  return (
    <Select
      id="numberOfPayments"
      onChange={selectedPaymentTermsChanged}
      borderRadius="full"
      size="sm"
      variant="outline"
      defaultValue={maxTermsAvailable}>
      {Array(maxTermsAvailable)
        .fill()
        .map((_, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <option value={index + 1} key={index}>
            {index + 1}
          </option>
        ))}
    </Select>
  );
};

export default PaymentTermsConfigurator;
