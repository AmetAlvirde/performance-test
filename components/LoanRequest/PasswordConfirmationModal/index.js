import React, { useState, useContext } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  Button,
  Flex
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import ClearanceIssue from '../../Global/ClearanceIssue';
import { UserContext } from '../../Providers/UserProvider';
import { LoanRequestFlowContext } from '../../Providers/LoanRequestFlowProvider';

const Casham = () => {};

const PasswordConfirmationModal = ({ isOpen, onClose, setIsSubmitting }) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const { email, cashamUser, cashamHash } = useContext(UserContext);
  const {
    currentStep,
    setCurrentStep,
    selectedLoanAmount,
    selectedPaymentTerms,
    withdrawalMethod
  } = useContext(LoanRequestFlowContext);

  const [isCheckingPassword, setIsCheckingPassword] = useState(false);
  const [authError, setAuthError] = useState(false);

  const confirmLoan = () => {
    const casham = (() => {
      const opts = {
        user: cashamUser,
        hash: cashamHash,
        domain: process.env.NEXT_PUBLIC_CASHAM_API
      };

      return new Casham(opts);
    })();

    casham
      .userLoansRequest({
        amount: selectedLoanAmount,
        term: Number(selectedPaymentTerms),
        collect_method: withdrawalMethod
      })
      .then(response => {
        if (response.ok) {
          setIsSubmitting(false);
          setCurrentStep(currentStep + 1);
        }
      })
      .catch(err => {
        setIsSubmitting(false);
        // eslint-disable-next-line no-console
        console.error(err);
      });
  };

  const onSubmit = () => {
    const password = document.querySelector('#password').value;
    const url = '/api/auth-before-loan-confirmation';

    setIsCheckingPassword(true);

    fetch(url, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => {
        setIsCheckingPassword(true);
        if (response.status === 401) {
          setIsCheckingPassword(false);
          setAuthError(true);
        }

        if (response.status === 200) {
          setIsSubmitting(true);
          confirmLoan();
          onClose();
          setIsCheckingPassword(false);
        }
      })
      .catch(err => {
        // eslint-disable-next-line no-console
        console.log(err);
      });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <span>¡Ya casi!</span>
          <ModalCloseButton />
        </ModalHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody>
            <p>
              Por seguridad, para confirmar tu préstamo, escribe tu contraseña
              de Casham
            </p>
            <br />
            <FormControl id="passwordField">
              <FormLabel>Password</FormLabel>
              <Input
                id="password"
                type="password"
                {...register('password', {
                  required: 'La contraseña es un campo obligatorio'
                })}
              />
            </FormControl>
            {errors.password && (
              <ClearanceIssue type="error" message={errors.password.message} />
            )}
            <Flex justifyContent="flex-end">
              <Button onClick={onClose} colorScheme="green" variant="ghost">
                Cancelar
              </Button>
              <Button
                isLoading={isCheckingPassword}
                loadingText="Iniciando sesión"
                type="submit"
                colorScheme="green"
                variant="ghost"
              >
                Aceptar
              </Button>
            </Flex>
            <Flex>
              {authError ? (
                <ClearanceIssue
                  type="error"
                  message="Contraseña incorrecta. Intenta nuevamente"
                />
              ) : null}
            </Flex>
          </ModalBody>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default PasswordConfirmationModal;
