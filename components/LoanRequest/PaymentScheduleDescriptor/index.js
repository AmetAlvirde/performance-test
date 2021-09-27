import React from 'react';
import { chakra, Box, Flex } from '@chakra-ui/react';
import moment from 'moment';

const PaymentScheduleDescriptor = ({ confirmedLoan, confirmedLoanLoading }) => (
  <Box
    witdh={{ base: '90vw' }}
    maxWidth={{ base: '90vw' }}
    paddingX={{ base: '2vw' }}
    shadow="lg"
    marginTop={{ base: '2.5vh' }}
    rounded="lg">
    <chakra.div marginBottom={{ base: '2vh' }}>
      <chakra.h2 fontWeight="bold" fontSize={{ base: '1.15em' }}>
        Pagos
      </chakra.h2>
      {confirmedLoanLoading ? (
        <>
          <chakra.span>cargando pagos...</chakra.span>
        </>
      ) : (
        <>
          {confirmedLoan.dates.map(date => (
            <Flex
              paddingY={{ base: '.5vh' }}
              direction="row"
              key={date}
              justifyContent="space-between">
              <chakra.span>{moment(date).format('DD-MM-YYYY')}</chakra.span>
              <chakra.span fontWeight="bold" fontSize="1.10em">
                ${confirmedLoan.each_payment.toFixed(2)}
              </chakra.span>
            </Flex>
          ))}
          <chakra.p color="#8E8E8E" marginY={{ base: '1vh' }}>
            {confirmedLoan.dates.length} pago(s) de $
            {confirmedLoan.each_payment.toFixed(2)} el{' '}
            {moment(confirmedLoan.dates[0]).format('DD-MM-YYYY')}.
          </chakra.p>
          <chakra.p color="#8E8E8E">
            el monto exacto, lo conocerás al llegar la fecha de pago.
          </chakra.p>
        </>
      )}
    </chakra.div>
  </Box>
);

export default PaymentScheduleDescriptor;
