import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody
} from '@chakra-ui/react';

const BankExplainerModal = ({ isOpen, onClose }) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>
        <span>Recoger en sucursal</span>
        <ModalCloseButton />
      </ModalHeader>
      <ModalBody>
        <p>
          Acude a tu sucursal Scotiabank más cercana con tu INE o pasaporte, es
          necesario para que puedas recoger tu dinero.
        </p>
        <br />
        <p>
          Tienes 3 días para recogerlo, si no lo haces, perderás tu gema de
          préstamo y tendrás que solicitar un préstamo de nuevo.
        </p>
      </ModalBody>
    </ModalContent>
  </Modal>
);

export default BankExplainerModal;
