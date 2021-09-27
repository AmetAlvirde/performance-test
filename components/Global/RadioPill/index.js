import React from 'react';
import { Box, useRadio } from '@chakra-ui/react';

const RadioPill = props => {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="full"
        boxShadow="md"
        _checked={{
          bg: 'green.600',
          color: 'white',
          borderColor: 'green.600'
        }}
        _focus={{
          boxShadow: 'outline'
        }}
        paddingX={{ base: '2.5vw' }}
        paddingY={{ base: '0.75vh' }}>
        {/* eslint-disable-next-line react/destructuring-assignment */}
        {props.children}
      </Box>
    </Box>
  );
};

export default RadioPill;
