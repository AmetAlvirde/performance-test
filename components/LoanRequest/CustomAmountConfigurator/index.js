import React, { useContext } from 'react';
import { chakra, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../Providers/UserProvider';
import { LoanRequestFlowContext } from '../../Providers/LoanRequestFlowProvider';
import ClearanceIssue from '../../Global/ClearanceIssue';
import recalculateLoan from '../../../lib/recalculateLoan';

const CustomAmountConfigurator = () => {
  const { loanMaxAmount, fee, interestRate, extraPeriods } =
    useContext(UserContext);
  const {
    customAmountLoan,
    selectedPaymentTerms,
    setCustomAmountLoan,
    setPaymentCalculations,
    setSelectedLoanAmount,
    setIsLoanAmountEnough,
    eightyPercentMaxAmount
  } = useContext(LoanRequestFlowContext);

  const {
    register,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      customAmount: customAmountLoan
    }
  });

  return (
    <chakra.div marginBottom={{ base: '2vh' }}>
      <FormControl id="otherAmount">
        <FormLabel>
          ¿Cuánto quieres pedir (debe ser un múltiplo de 100)
        </FormLabel>
        <Input
          id="customAmountInput"
          type="number"
          {...register('customAmount', {
            validate: customAmountCandidate => {
              if (customAmountCandidate < eightyPercentMaxAmount) {
                setIsLoanAmountEnough(false);
              } else {
                setIsLoanAmountEnough(true);
              }

              if (
                !customAmountCandidate ||
                customAmountCandidate % 100 ||
                customAmountCandidate < 200
              ) {
                return 'Ingresa un múltiplo de $100 mayor a $200';
              }

              if (customAmountCandidate > loanMaxAmount) {
                return `Tu límite máximo es de $${loanMaxAmount}`;
              }

              setCustomAmountLoan(Number(customAmountCandidate));
              setSelectedLoanAmount(Number(customAmountCandidate));

              setPaymentCalculations(
                recalculateLoan({
                  newAmount: Number(customAmountCandidate) + fee,
                  terms: selectedPaymentTerms,
                  fee,
                  interestRate,
                  extraPeriods
                })
              );
              return true;
            }
          })}
        />
      </FormControl>
      {errors.customAmount && (
        <ClearanceIssue type="error" message={errors.customAmount.message} />
      )}
    </chakra.div>
  );
};

export default CustomAmountConfigurator;
