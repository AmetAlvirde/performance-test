import React from 'react';
import { chakra, Box, Flex } from '@chakra-ui/react';

const LoanBriefDescriptor = ({ confirmedLoanLoading, confirmedLoan, fee }) => (
  <Box
    witdh={{ base: '90vw' }}
    maxWidth={{ base: '90vw' }}
    paddingX={{ base: '2vw' }}
    marginTop={{ base: '2.5vh' }}
    shadow="lg"
    rounded="lg">
    <chakra.div marginBottom={{ base: '2vh' }}>
      <chakra.h2 fontWeight="bold" fontSize={{ base: '1.15em' }}>
        Detalles de tu préstamo
      </chakra.h2>
      {confirmedLoanLoading ? (
        <chakra.p>cargando detalles...</chakra.p>
      ) : (
        <>
          <Flex
            paddingY={{ base: '.5vh' }}
            direction="row"
            justifyContent="space-between">
            <chakra.span>Cantidad solicitada: </chakra.span>
            <chakra.span fontWeight="bold">
              ${confirmedLoan.amount.toFixed(2)}
            </chakra.span>
          </Flex>
          <Flex
            paddingY={{ base: '.5vh' }}
            direction="row"
            justifyContent="space-between">
            <chakra.span>Cargo por servicio: </chakra.span>
            <chakra.span fontWeight="bold">
              ${fee ? fee.toFixed(2) : null}
            </chakra.span>
          </Flex>
          <Flex
            paddingY={{ base: '.5vh' }}
            direction="row"
            justifyContent="flex-end">
            <chakra.span
              fontSize={{ base: '1.10em' }}
              fontWeight="bold"
              marginRight={{ base: '3vw' }}>
              Total a financiar:{' '}
            </chakra.span>
            <chakra.span
              color="brand.primary"
              fontSize="1.10em"
              fontWeight="bold">
              ${(confirmedLoan.amount + fee).toFixed(2)}
            </chakra.span>
          </Flex>
        </>
      )}
    </chakra.div>
  </Box>
);

export default LoanBriefDescriptor;
