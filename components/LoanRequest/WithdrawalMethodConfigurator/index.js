import React, { useContext } from 'react';
import {
  Box,
  RadioGroup,
  Flex,
  Radio,
  Icon,
  useDisclosure
} from '@chakra-ui/react';
import { FaQuestionCircle } from 'react-icons/fa';
import { UserContext } from '../../Providers/UserProvider';
import { LoanRequestFlowContext } from '../../Providers/LoanRequestFlowProvider';
import CLABEConfigurator from '../CLABEConfigurator';
import BankExplainerModal from '../BankExplainerModal';
import DepositExplainerModal from '../DepositExplainerModal';

const WithdrawalMethodConfigurator = () => {
  const { CLABE } = useContext(UserContext);
  const { withdrawalMethod, setWithdrawalMethod } = useContext(
    LoanRequestFlowContext
  );

  const {
    isOpen: bankExplainerModalIsOpen,
    onOpen: bankExplainerModalOnOpen,
    onClose: bankExplainerModalOnClose
  } = useDisclosure();

  const {
    isOpen: depositExplainerModalIsOpen,
    onOpen: depositExplainerModalOnOpen,
    onClose: depositExplainerModalOnClose
  } = useDisclosure();

  return (
    <>
      <Box
        witdh={{ base: 'xs' }}
        maxWidth={{ base: '90vw' }}
        paddingX={{ base: '2vw' }}
        marginTop={{ base: '1vh' }}
        shadow="lg"
        rounded="lg">
        <p>Escoge el método de entrega:</p>
        <RadioGroup onChange={setWithdrawalMethod} value={withdrawalMethod}>
          <Flex
            paddingY={{ base: '.5vh' }}
            direction="row"
            justifyContent="space-between">
            <Radio colorScheme="green" value="bank" size="sm" name="bank">
              Recoger en sucursal Scotiabank
            </Radio>
            <Icon
              as={FaQuestionCircle}
              onClick={bankExplainerModalOnOpen}
              color="green"
            />
          </Flex>
          <Flex
            paddingY={{ base: '.5vh' }}
            direction="row"
            justifyContent="space-between">
            <Radio
              disabled={!CLABE}
              colorScheme="green"
              value="deposit"
              size="sm"
              name="transfer">
              Depósito en cuenta CLABE
            </Radio>
            <Icon
              onClick={depositExplainerModalOnOpen}
              as={FaQuestionCircle}
              color="green"
            />
          </Flex>
        </RadioGroup>
        {withdrawalMethod === 'deposit' ? <CLABEConfigurator /> : null}
      </Box>
      <BankExplainerModal
        isOpen={bankExplainerModalIsOpen}
        onClose={bankExplainerModalOnClose}
      />
      <DepositExplainerModal
        isOpen={depositExplainerModalIsOpen}
        onClose={depositExplainerModalOnClose}
      />
    </>
  );
};

export default WithdrawalMethodConfigurator;
