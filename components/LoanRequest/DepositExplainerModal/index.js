import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody
} from '@chakra-ui/react';

const DepositExplainerModal = ({ isOpen, onClose }) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>
        <span>Transferencia bancaria</span>
        <ModalCloseButton />
      </ModalHeader>
      <ModalBody>
        <p>
          Para tener disponible esta opción debemos contar con tu información
          bancaria, puedes agregarla o editarla en la sección
          &quot;Referencias&quot; dentro de tu perfil
        </p>
        <br />
        <p>
          Te pediremos confirmar la CLABE al solicitar tu préstamo y lo
          depositaremos directamente en tu cuenta
        </p>
      </ModalBody>
    </ModalContent>
  </Modal>
);

export default DepositExplainerModal;
