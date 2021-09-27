import React, { useState, useContext, useEffect } from 'react';
import { Button, Flex, useDisclosure } from '@chakra-ui/react';
import { UserContext } from '../../Providers/UserProvider';
import { LoanRequestFlowContext } from '../../Providers/LoanRequestFlowProvider';
import WithdrawalMethodDescriptor from '../WithdrawalMethodDescriptor';
import LoanBriefDescriptor from '../LoanBriefDescriptor';
import InterestRateDescriptor from '../InterestRateDescriptor';
import PaymentScheduleDescriptor from '../PaymentScheduleDescriptor';
import ClearanceIssue from '../../Global/ClearanceIssue';
import PasswordConfirmationModal from '../PasswordConfirmationModal';

const Casham = () => {};

const LoanConfirmation = () => {
  const { fee, interestRate, cashamUser, cashamHash, CLABE } =
    useContext(UserContext);
  const {
    withdrawalMethod,
    currentStep,
    setCurrentStep,
    selectedLoanAmount,
    selectedPaymentTerms
  } = useContext(LoanRequestFlowContext);

  const {
    isOpen: passwordConfirmationModalIsOpen,
    onOpen: passwordConfirmationModalOnOpen,
    onClose: passwordConfirmationModalOnClose
  } = useDisclosure();

  const [confirmedLoan, setConfirmedLoan] = useState({
    amount: selectedLoanAmount,
    term: selectedPaymentTerms,
    collect_method: withdrawalMethod
  });
  const [confirmLoanError, setConfirmLoanError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedLoanLoading, setConfirmedLoanLoading] = useState(true);

  const casham = (() => {
    const opts = {
      user: cashamUser,
      hash: cashamHash,
      domain: process.env.NEXT_PUBLIC_CASHAM_API
    };

    return new Casham(opts);
  })();

  useEffect(() => {
    casham
      .userLoansConfirmation({
        amount: selectedLoanAmount,
        term: selectedPaymentTerms,
        collect_method: withdrawalMethod
      })
      .then(res => {
        setConfirmedLoan(res.loan);
        setConfirmedLoanLoading(false);
      })
      .catch(err => {
        setConfirmLoanError(true);
        setConfirmedLoanLoading(false);
        // eslint-disable-next-line no-console
        console.error(err);
      });
    // Usamos como dependencia confirmedLoan.amount, porque cuando usas un
    // objeto como dependencia en un useEffect, corres el riesgo de causar un
    // loop infinito, usando una propiedad de éste, nos aseguramos de que eso
    // no suceda.
  }, [confirmedLoan.amount]);

  const backToLoanDetails = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <Flex width={{ base: '90vw', md: '40vw' }} direction="column">
      {confirmLoanError ? (
        <ClearanceIssue
          type="error"
          message="Ocurrió un error inesperado, por favor vuelve a intentarlo"
        />
      ) : null}
      <WithdrawalMethodDescriptor
        CLABE={CLABE}
        withdrawalMethod={withdrawalMethod}
      />
      <LoanBriefDescriptor
        confirmedLoanLoading={confirmedLoanLoading}
        confirmedLoan={confirmedLoan}
        fee={fee}
      />
      <InterestRateDescriptor interestRate={interestRate} />
      <PaymentScheduleDescriptor
        confirmedLoanLoading={confirmedLoanLoading}
        confirmedLoan={confirmedLoan}
      />

      <Flex
        paddingY={{ base: '.5vh' }}
        direction="row"
        justifyContent="space-between"
      >
        <Button
          onClick={backToLoanDetails}
          marginTop={{ base: '2vh' }}
          colorScheme="green"
          variant="ghost"
          size="md"
        >
          ATRÁS
        </Button>
        <Button
          isLoading={isSubmitting}
          disabled={!confirmedLoan}
          loadingText="Solicitando préstamo"
          onClick={passwordConfirmationModalOnOpen}
          marginTop={{ base: '2vh' }}
          colorScheme="green"
          size="md"
        >
          CONFIRMAR
        </Button>
      </Flex>
      <PasswordConfirmationModal
        setIsSubmitting={setIsSubmitting}
        isOpen={passwordConfirmationModalIsOpen}
        onClose={passwordConfirmationModalOnClose}
      />
    </Flex>
  );
};

export default LoanConfirmation;
