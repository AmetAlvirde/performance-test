import React from 'react';
import { Alert, AlertIcon } from '@chakra-ui/react';

const ClearanceIssue = ({
  type = 'error',
  message = 'ocurrió un error inesperado'
}) => (
  <Alert role="alert" status={type}>
    <AlertIcon />
    <span>{message}</span>
  </Alert>
);

export default ClearanceIssue;
