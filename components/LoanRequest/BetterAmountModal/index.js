import React, { useContext } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalContent,
  ModalBody,
  Flex,
  Button
} from '@chakra-ui/react';
import { LoanRequestFlowContext } from '../../Providers/LoanRequestFlowProvider';
import { UserContext } from '../../Providers/UserProvider';

const BetterAmountModal = ({ isOpen, onClose }) => {
  const {
    setSelectedLoanAmount,
    currentStep,
    setCurrentStep,
    ninetyPercentMaxAmount,
    eightyPercentMaxAmount
  } = useContext(LoanRequestFlowContext);
  const { loanMaxAmount } = useContext(UserContext);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <span>¡Espera!</span>
          <ModalCloseButton />
        </ModalHeader>
        <ModalBody>
          <p>
            Aumenta la cantidad solicitada a mínimo el 80% de tu línea de
            crédito y obtén como regalo, una gema de invitación y otra gema de
            préstamo
          </p>
          <Flex direction="column">
            <Button
              onClick={() => {
                setSelectedLoanAmount(loanMaxAmount);
                onClose();
                setCurrentStep(currentStep + 1);
              }}
              marginY={{ base: '1.5vh' }}
              colorScheme="green"
              variant="outline">
              ${loanMaxAmount ? loanMaxAmount.toFixed(2) : null}
            </Button>
            <Button
              onClick={() => {
                setSelectedLoanAmount(ninetyPercentMaxAmount);
                onClose();
                setCurrentStep(currentStep + 1);
              }}
              marginY={{ base: '1.5vh' }}
              colorScheme="green"
              variant="outline">
              $
              {ninetyPercentMaxAmount
                ? ninetyPercentMaxAmount.toFixed(2)
                : null}
            </Button>
            <Button
              onClick={() => {
                setSelectedLoanAmount(eightyPercentMaxAmount);
                onClose();
                setCurrentStep(currentStep + 1);
              }}
              marginY={{ base: '1.5vh' }}
              colorScheme="green"
              variant="outline">
              $
              {eightyPercentMaxAmount
                ? eightyPercentMaxAmount.toFixed(2)
                : null}
            </Button>
          </Flex>

          <Flex justifyContent="flex-end">
            <Button
              onClick={() => {
                // Se agrega esta validación porque si un usuario:
                // 1. Elige el monto 'otro'
                // 2. Edita el monto por uno inválido
                // 3. Llegara al modal con ese monto y presionara continuar
                // Podría potencialmente acceder a la siguiente pantalla con
                // un monto inválido
                const customAmountCandidate =
                  document.querySelector('#customAmountInput').value;

                if (
                  customAmountCandidate >= 200 &&
                  customAmountCandidate % 100 === 0
                ) {
                  setCurrentStep(currentStep + 1);
                } else {
                  onClose();
                }
              }}
              marginY={{ base: '1.5vh' }}
              colorScheme="green"
              variant="ghost">
              Continuar
            </Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default BetterAmountModal;
