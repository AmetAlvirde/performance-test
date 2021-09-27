import React, { useContext, useState, useEffect } from 'react';
import { chakra, Box, HStack, useRadioGroup } from '@chakra-ui/react';
import { UserContext } from '../../Providers/UserProvider';
import { LoanRequestFlowContext } from '../../Providers/LoanRequestFlowProvider';
import CustomAmountConfigurator from '../CustomAmountConfigurator';
import RadioPill from '../../Global/RadioPill';
import PaymentTermsConfigurator from '../PaymentTermsConfigurator';
import ClearanceIssue from '../../Global/ClearanceIssue';
import recalculateLoan from '../../../lib/recalculateLoan';

const LoanConfigurator = () => {
  const {
    selectedPaymentTerms,
    setSelectedPaymentTerms,
    selectedLoanAmount,
    setSelectedLoanAmount,
    setPaymentCalculations,
    customAmountLoan,
    isLoanAmountEnough,
    setIsLoanAmountEnough,
    eightyPercentMaxAmount,
    ninetyPercentMaxAmount
  } = useContext(LoanRequestFlowContext);

  const { loanMaxAmount, fee, interestRate, extraPeriods } =
    useContext(UserContext);

  useEffect(() => {
    setPaymentCalculations(
      recalculateLoan({
        newAmount: selectedLoanAmount,
        terms: selectedPaymentTerms,
        fee,
        interestRate,
        extraPeriods
      })
    );
  }, [selectedPaymentTerms]);

  const [isCustomAmountSelected, setIsCustomAmountSelected] = useState(false);

  const getDefaultAmountValue = () => {
    if (isCustomAmountSelected) {
      return 'Otro';
    }

    // Para cuando configuren, vayan a LoanConfirmation, se arrepientan y
    // vuelvan al configurador; así se mantendrá seleccionada la cantidad con
    // la que se estaba trabajando.
    if (selectedLoanAmount) {
      return `$${selectedLoanAmount}`;
    }

    return `$${loanMaxAmount}`;
  };

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'loanAmountOptions',
    defaultValue: getDefaultAmountValue(),
    onChange: newAmount => {
      if (newAmount === 'Otro') {
        setIsCustomAmountSelected(true);
        setIsLoanAmountEnough(false);
        if (customAmountLoan) {
          const maxPaymentTerms = Math.ceil(customAmountLoan / 500);
          setSelectedLoanAmount(customAmountLoan);

          if (selectedPaymentTerms > maxPaymentTerms) {
            setSelectedPaymentTerms(maxPaymentTerms);
          }

          setPaymentCalculations(
            recalculateLoan({
              newAmount: customAmountLoan + fee,
              terms: maxPaymentTerms,
              fee,
              interestRate,
              extraPeriods
            })
          );
        }
      } else {
        setIsCustomAmountSelected(false);
        const formattedAmount = Number(newAmount.substring(1));
        setSelectedLoanAmount(formattedAmount);

        setPaymentCalculations(
          recalculateLoan({
            newAmount: formattedAmount + fee,
            terms: selectedPaymentTerms,
            fee,
            interestRate,
            extraPeriods
          })
        );
      }
    }
  });

  const group = getRootProps();

  const loanAmountOptions = [
    ...new Set([
      `$${loanMaxAmount}`,
      `$${ninetyPercentMaxAmount}`,
      `$${eightyPercentMaxAmount}`,
      'Otro'
    ])
  ];

  const notEnoughLoanAmount = `Para obtener tus gemas de recompensa, pide un préstamo por al menos 80% de tu línea de crédito: ${eightyPercentMaxAmount.toFixed(
    2
  )}`;

  return (
    <>
      {!isLoanAmountEnough ? (
        <ClearanceIssue
          marginBottom={{ base: '2vh' }}
          type="warning"
          message={notEnoughLoanAmount}
        />
      ) : null}
      <Box
        witdh={{ base: 'xs' }}
        maxWidth={{ base: '90vw' }}
        paddingX={{ base: '2vw' }}
        paddingY={{ base: '2vw' }}
        marginBottom={{ base: '3vh' }}
        shadow="lg"
        rounded="lg">
        <p>
          Te recomendamos elegir uno de los siguientes montos para recibir una
          gema de préstamo y otra de invitación
        </p>
        <hr />
        <chakra.div marginY={{ base: '2vh' }}>
          <HStack {...group}>
            {loanAmountOptions.map(value => {
              const radio = getRadioProps({ value });
              return (
                <RadioPill key={value} {...radio}>
                  {value}
                </RadioPill>
              );
            })}
          </HStack>
        </chakra.div>
        {isCustomAmountSelected ? <CustomAmountConfigurator /> : null}
        <chakra.div paddingBottom={{ base: '0.5vh' }}>
          <p>¿En cuántas catorcena(s) quieres pagar?</p>
        </chakra.div>
        <PaymentTermsConfigurator />
      </Box>
    </>
  );
};

export default LoanConfigurator;
