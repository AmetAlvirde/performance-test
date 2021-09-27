import React from 'react';
import { chakra, Box, Flex } from '@chakra-ui/react';

const InterestRateDescriptor = ({ interestRate }) => (
  <Box
    witdh={{ base: '90vw' }}
    maxWidth={{ base: '90vw' }}
    paddingX={{ base: '2vw' }}
    shadow="lg"
    marginTop={{ base: '2.5vh' }}
    rounded="lg">
    <chakra.div marginBottom={{ base: '2vh' }}>
      <chakra.h2 fontWeight="bold" fontSize={{ base: '1.15em' }}>
        Tasa de interés
      </chakra.h2>
      <Flex
        paddingY={{ base: '.5vh' }}
        direction="row"
        justifyContent="space-between">
        <chakra.span>interés diario</chakra.span>
        <chakra.span fontWeight="bold" fontSize="1.10em" color="brand.primary">
          {interestRate}%
        </chakra.span>
      </Flex>
    </chakra.div>
  </Box>
);

export default InterestRateDescriptor;
