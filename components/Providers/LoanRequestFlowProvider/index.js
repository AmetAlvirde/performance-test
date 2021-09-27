import React, { createContext, useContext, useState } from 'react';
import { UserContext } from '../UserProvider';

const calcPayments = () => {};

export const LoanRequestFlowContext = createContext();

const LoanRequestFlowProvider = ({ children }) => {
  const { loanMaxAmount, fee, interestRate, extraPeriods } =
    useContext(UserContext);
  const sixtyPercentMaxAmount = Math.ceil((loanMaxAmount * 0.6) / 100) * 100;
  const eightyPercentMaxAmount = Math.ceil((loanMaxAmount * 0.8) / 100) * 100;
  const ninetyPercentMaxAmount = Math.ceil((loanMaxAmount * 0.9) / 100) * 100;

  const [currentStep, setCurrentStep] = useState(0);
  const [withdrawalMethod, setWithdrawalMethod] = useState('bank');
  const [selectedLoanAmount, setSelectedLoanAmount] = useState(loanMaxAmount);
  const [isLoanAmountEnough, setIsLoanAmountEnough] = useState(true);
  const [CLABECandidate, setCLABECandidate] = useState(0);
  const [customAmountLoan, setCustomAmountLoan] = useState(
    sixtyPercentMaxAmount
  );
  const [selectedPaymentTerms, setSelectedPaymentTerms] = useState(
    Math.ceil(selectedLoanAmount / 500)
  );

  const [paymentCalculations, setPaymentCalculations] = useState(
    calcPayments({
      amount: loanMaxAmount,
      fee,
      rate: interestRate,
      term: selectedPaymentTerms,
      extra_periods: extraPeriods
    })
  );

  return (
    <LoanRequestFlowContext.Provider
      value={{
        currentStep,
        setCurrentStep,
        interestRate,
        withdrawalMethod,
        setWithdrawalMethod,
        selectedPaymentTerms,
        setSelectedPaymentTerms,
        selectedLoanAmount,
        setSelectedLoanAmount,
        paymentCalculations,
        setPaymentCalculations,
        customAmountLoan,
        setCustomAmountLoan,
        CLABECandidate,
        setCLABECandidate,
        isLoanAmountEnough,
        setIsLoanAmountEnough,
        sixtyPercentMaxAmount,
        eightyPercentMaxAmount,
        ninetyPercentMaxAmount
      }}
    >
      {children}
    </LoanRequestFlowContext.Provider>
  );
};

export default LoanRequestFlowProvider;
