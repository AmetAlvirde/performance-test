import React from 'react';
import {
  AspectRatio,
  chakra,
  Box,
  Image,
  Flex,
  Icon
  // Button,
} from '@chakra-ui/react';

import { MdHeadset } from 'react-icons/md';

const HomeCard = () => (
  <Box
    minWidth={{ base: '320px' }}
    maxWidth={{ base: '360px' }}
    /* bg={useColorModeValue('white', 'gray.800')} */
    shadow="lg"
    rounded="lg"
    overflow="hidden"
  >
    <AspectRatio maxWidth={{ base: '400px' }} ratio={26 / 9}>
      <Image
        w="320"
        h={100}
        fit="cover"
        objectPosition="center"
        src="https://via.placeholder.com/300x100"
        alt="avatar"
      />
    </AspectRatio>

    <Flex
      width="100%"
      alignItems="center"
      justifyItems="space-between"
      bg="gray.900"
    >
      <chakra.p mx={3} color="white" fontWeight="bold" fontSize="sm">
        Mantente al día
      </chakra.p>
      <Icon
        as={MdHeadset}
        h={{ base: '3.5vh' }}
        w={{ base: '3.5w' }}
        padding={{ base: '0' }}
        color="white"
      />
    </Flex>
    <Box py={4} px={6}>
      <chakra.p fontSize={{ base: '0.78em' }}>
        No olvides que Casham premia tu pago puntial ofreciéndote una tasa de
        interés cada vez más baja
      </chakra.p>
      {/* This would require some more wiring in order to see what to put on the */}
      {/* button */}
      {/* <Button */}
      {/*   marginTop={{ base: '1vh' }} */}
      {/*   colorScheme="green" */}
      {/*   size="sm" */}
      {/*   variant="ghost"> */}
      {/*   VER MI SIGUIENTE PAGO */}
      {/* </Button> */}
    </Box>
  </Box>
);

export default HomeCard;
