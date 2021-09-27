import React from 'react';
import { chakra, Box, Flex } from '@chakra-ui/react';

const WithdrawalMethodDescriptor = ({ withdrawalMethod, CLABE }) => (
  <Box
    witdh={{ base: '90vw' }}
    maxWidth={{ base: '90vw' }}
    paddingX={{ base: '2vw' }}
    shadow="lg"
    rounded="lg">
    <chakra.div marginBottom={{ base: '2vh' }}>
      <chakra.h2 fontWeight="bold" fontSize={{ base: '1.15em' }}>
        Método de entrega
      </chakra.h2>
      {withdrawalMethod === 'deposit' ? (
        <>
          <chakra.p marginY={{ base: '1vh' }}>Depósito en cuenta</chakra.p>
          <Flex
            paddingY={{ base: '.5vh' }}
            direction="row"
            justifyContent="space-between">
            <chakra.span>CLABE</chakra.span>
            <chakra.span>{CLABE}</chakra.span>
          </Flex>
        </>
      ) : null}
      {withdrawalMethod === 'bank' ? (
        <>
          <chakra.p marginY={{ base: '1vh' }}>
            Recoger en sucursal Scotiabank
          </chakra.p>
        </>
      ) : null}
    </chakra.div>
  </Box>
);

export default WithdrawalMethodDescriptor;
