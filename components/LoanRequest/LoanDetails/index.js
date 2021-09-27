import React, { useState, useEffect, useContext } from 'react';
import { chakra, Center, Box, Button, useDisclosure } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import LoanConfigurator from '../LoanConfigurator';
import WithdrawalMetodConfigurator from '../WithdrawalMethodConfigurator';
import LoanOverview from '../LoanOverview';
import ClearanceIssue from '../../Global/ClearanceIssue';
import { LoanRequestFlowContext } from '../../Providers/LoanRequestFlowProvider';
import BetterAmountModal from '../BetterAmountModal';
import { UserContext } from '../../Providers/UserProvider';

const Casham = () => {};

const LoanDetails = () => {
  const {
    currentStep,
    setCurrentStep,
    withdrawalMethod,
    CLABECandidate,
    isLoanAmountEnough
  } = useContext(LoanRequestFlowContext);

  // Se declaran los disclosure del modal aquíy en WithdrawalMethodConfigurator
  // para parsárselos como  props a cada modal. No se guardan en ningún
  // proveedor porque causan un loop de renders y la app se muere.

  const {
    isOpen: betterAmountModalIsOpen,
    onOpen: betterAmountModalOnOpen,
    onClose: betterAmountModalOnClose
  } = useDisclosure();

  const [CLABESDontMatch, setCLABESDontMatch] = useState(false);

  const [hasLoanTokens, setHasLoanTokens] = useState(NaN);

  const { handleSubmit } = useForm({});

  const { CLABE, cashamUser, cashamHash } = useContext(UserContext);

  // En una siguiente refactorización, lo siguiente debería quedar como una
  // hook personalizada:

  // Inicio de futuro hook;
  const casham = (() => {
    const opts = {
      user: cashamUser,
      hash: cashamHash,
      domain: process.env.NEXT_PUBLIC_CASHAM_API
    };

    return new Casham(opts);
  })();

  useEffect(() => {
    if (cashamUser && cashamHash) {
      casham
        .userGet()
        .then(res => {
          setHasLoanTokens(res.loan_tokens);
        })
        .catch(err => {
          // eslint-disable-next-line no-console
          console.log(err);
        });
    }
  }, []);
  // Fin del futuro hook

  // Valida que las CLABES cuadren y si lo hacen, quita la alerta de error
  // correspondiente
  useEffect(() => {
    if (CLABECandidate === CLABE) {
      setCLABESDontMatch(false);
    }
  }, [CLABECandidate]);

  const onSubmit = () => {
    if (!isLoanAmountEnough) {
      betterAmountModalOnOpen();
    } else if (withdrawalMethod === 'deposit') {
      if (CLABECandidate === CLABE) {
        setCurrentStep(currentStep + 1);
      } else {
        setCLABESDontMatch(true);
      }
    } else {
      // withdrawalMethod === 'bank'
      setCurrentStep(currentStep + 1);
    }
  };

  if (hasLoanTokens >= 1) {
    return (
      <>
        <Box
          marginLeft={{ base: '3vw' }}
          minWidth={{ base: '360px' }}
          maxWidth={{ base: '40vw', sm: '60vw', lg: '60vw' }}
          direction="column"
        >
          {withdrawalMethod === 'deposit' && CLABESDontMatch ? (
            <ClearanceIssue
              marginBottom={{ base: '2vh' }}
              type="error"
              message="Escribe la CLABE correcta para continuar"
            />
          ) : null}
          <chakra.form onSubmit={handleSubmit(onSubmit)}>
            <LoanConfigurator />
            <WithdrawalMetodConfigurator />
            <LoanOverview />
            <Box witdh={{ base: 'xs', sm: '100%' }}>
              <Button
                width={{ base: '350px' }}
                onClick={onSubmit}
                marginTop={{ base: '2vh' }}
                marginLeft={{ base: '1vw' }}
                colorScheme="green"
                size="md"
              >
                SOLICITAR
              </Button>
            </Box>
          </chakra.form>
        </Box>
        <BetterAmountModal
          isOpen={betterAmountModalIsOpen}
          onClose={betterAmountModalOnClose}
        />
      </>
    );
  }

  if (hasLoanTokens === 0) {
    return (
      <Center marginTop={{ base: '1.5vh' }}>
        <ClearanceIssue
          type="error"
          message="Lo sentimos, para pedir un préstamo, necesitas una gema de préstamo."
        />
      </Center>
    );
  }

  return <p>Cargando...</p>;
};

export default LoanDetails;
