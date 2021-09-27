import React, { useContext } from 'react';
import { chakra, Flex, Box } from '@chakra-ui/react';
import { LoanRequestFlowContext } from '../../Providers/LoanRequestFlowProvider';
import { UserContext } from '../../Providers/UserProvider';

const LoanOverview = () => {
  const { selectedPaymentTerms, paymentCalculations, selectedLoanAmount } =
    useContext(LoanRequestFlowContext);
  const { fee, interestRate } = useContext(UserContext);

  return (
    <Box
      witdh={{ base: 'xs' }}
      maxWidth={{ base: '90vw' }}
      paddingX={{ base: '2vw' }}
      marginTop={{ base: '3vh' }}
      shadow="lg"
      rounded="lg">
      <chakra.h2
        fontWeight="bold"
        fontSize={{ base: '1.25em' }}
        color="brand.primary">
        Detalles de tu préstamo
      </chakra.h2>
      <Flex
        maxWidth={{ base: '70vw' }}
        justifyContent="space-between"
        direction="row">
        <Flex direction="column">
          <Flex paddingY={{ base: '.5vh' }} direction="column">
            <chakra.span color="brand.primary" fontSize="1em">
              Número de pagos
            </chakra.span>
            <chakra.span fontSize=".90em">
              <chakra.span>
                {selectedPaymentTerms} de ${paymentCalculations.each_payment}
              </chakra.span>
            </chakra.span>
          </Flex>
          <Flex paddingY={{ base: '.5vh' }} direction="column">
            <chakra.span color="brand.primary" fontSize="1em">
              Plazo(s)
            </chakra.span>
            <chakra.span fontSize=".90em">
              {selectedPaymentTerms} catorcena(s)
            </chakra.span>
          </Flex>
          <Flex paddingY={{ base: '.5vh' }} direction="column">
            <chakra.span color="brand.primary" fontSize="1em">
              Último pago
            </chakra.span>
            <chakra.span fontSize=".90em">
              {paymentCalculations.dates[paymentCalculations.dates.length - 1]}
            </chakra.span>
          </Flex>
          <Flex paddingY={{ base: '.5vh' }} direction="column">
            <chakra.span color="brand.primary" fontSize="1em">
              Cantidad a financiar
            </chakra.span>
            <chakra.span fontSize=".90em">
              ${(selectedLoanAmount + fee).toFixed(2)}
            </chakra.span>
          </Flex>
        </Flex>
        <Flex direction="column">
          <Flex paddingY={{ base: '.5vh' }} direction="column">
            <chakra.span color="brand.primary" fontSize="1em">
              Cargo por servicio
            </chakra.span>
            <chakra.span fontSize=".90em">
              {/* For Some reason, if not rendered conditionally, logout */}
              {/* fails, and app crashes because  fee would be undefined.. */}$
              {fee ? fee.toFixed(2) : null}
            </chakra.span>
          </Flex>
          <Flex paddingY={{ base: '.5vh' }} direction="column">
            <chakra.span color="brand.primary" fontSize="1em">
              Tasa actual por plazo(s)
            </chakra.span>
            <chakra.span fontSize=".90em">
              {Math.round(interestRate * 14)}%
            </chakra.span>
          </Flex>
          <Flex paddingY={{ base: '.5vh' }} direction="column">
            <chakra.span color="brand.primary" fontSize="1em">
              CAT
            </chakra.span>
            <chakra.span fontSize=".90em">
              {Math.round(interestRate * 365)}%
            </chakra.span>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};

export default LoanOverview;
