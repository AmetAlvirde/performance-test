import React from 'react';
import LoanStepSwitcher from '../LoanStepSwitcher';
import LoanRequestFlowProvider from '../../Providers/LoanRequestFlowProvider';

const LoanRequestFlow = () => (
  <LoanRequestFlowProvider>
    <LoanStepSwitcher />
  </LoanRequestFlowProvider>
);

export default LoanRequestFlow;
