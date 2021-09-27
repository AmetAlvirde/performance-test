import React, { useContext } from 'react';
import { LoanRequestFlowContext } from '../../Providers/LoanRequestFlowProvider';
import LoanDetails from '../LoanDetails';
import LoanConfirmation from '../LoanConfirmation';
import LoanSuccess from '../LoanSuccess';

const LoanStepSwitcher = () => {
  const { currentStep } = useContext(LoanRequestFlowContext);

  switch (currentStep) {
    case 0:
      return <LoanDetails />;
    case 1:
      return <LoanConfirmation />;
    case 2:
      return <LoanSuccess />;
    default:
      return <p>You must choose a valid step</p>;
  }
};

export default LoanStepSwitcher;
