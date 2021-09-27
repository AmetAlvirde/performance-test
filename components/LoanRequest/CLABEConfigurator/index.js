import React, { useContext } from 'react';
import { chakra, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../Providers/UserProvider';
import { LoanRequestFlowContext } from '../../Providers/LoanRequestFlowProvider';
import ClearanceIssue from '../../Global/ClearanceIssue';

const CLABEVerificator = () => {
  const { CLABE } = useContext(UserContext);
  const { setCLABECandidate } = useContext(LoanRequestFlowContext);

  const {
    register,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      CLABECandidate: ''
    }
  });

  return (
    <chakra.div>
      <FormControl id="CLABEConfirmationField">
        <FormLabel>Confirma tu CLABE:</FormLabel>
        <Input
          id="CLABEConfirmation"
          marginBottom={{ base: '1vh' }}
          type="number"
          {...register('CLABEConfirmation', {
            validate: CLABECandidate => {
              setCLABECandidate(CLABECandidate);

              if (CLABECandidate.length !== 18) {
                return 'Ingresa una CLABE válida';
              }
              if (CLABECandidate !== CLABE) {
                return 'La CLABE que escribiste, no coincide con la que diste de alta en tu perfil';
              }

              return true;
            }
          })}
        />
      </FormControl>

      {errors.CLABEConfirmation && (
        <chakra.div marginY={{ base: '1.5vh' }}>
          <ClearanceIssue
            type="error"
            message={errors.CLABEConfirmation.message}
          />
        </chakra.div>
      )}
    </chakra.div>
  );
};

export default CLABEVerificator;
