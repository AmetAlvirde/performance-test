import React from 'react';
import { chakra, Box, Center, Flex, Image } from '@chakra-ui/react';

const LoanSuccess = () => (
  <Flex direction="column">
    <Center>
      <Image
        alt="reloj de arena, pero de monedas"
        maxWidth={{ base: '25vw', md: '20vw', lg: '15vw' }}
        src="/images/Reloj.png"
      />
    </Center>
    <Box
      witdh={{ base: '90vw' }}
      maxWidth={{ base: '90vw' }}
      paddingX={{ base: '2vw' }}
      marginTop={{ base: '2.5vh' }}
      shadow="lg"
      rounded="lg">
      <chakra.div marginBottom={{ base: '2vh' }}>
        <chakra.h2
          marginBottom={{ base: '1.5vh' }}
          fontWeight="bold"
          fontSize={{ base: '1em' }}>
          Tienes un préstamo activo
        </chakra.h2>
        <p>
          Puedes consultar el estado de tu préstamo, desde tu aplicación nativa
        </p>
      </chakra.div>
    </Box>
  </Flex>
);

export default LoanSuccess;
