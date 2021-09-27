import React, { memo, useContext } from 'react';
import {
  chakra,
  Box,
  Center,
  Flex,
  Icon,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Spacer,
  VStack
} from '@chakra-ui/react';
import { IoHome } from 'react-icons/io5';
import { FaDollarSign } from 'react-icons/fa';
import { UserContext } from '../../Providers/UserProvider';
import ClearanceIssue from '../../Global/ClearanceIssue';
import Layout from '../../Global/Layout';
import HomeCard from '../HomeCard';
import LoanRequestFlow from '../../LoanRequest/LoanRequestFlow';
import {
  bannedMessage,
  inactiveMessage,
  unverifiedEmailMessage,
  validationPendingMessage,
  unpaidPrimeMessage,
  primeWithActiveLoanMessage,
  standardWithActiveLoanMessage,
  hasNoLoanTokensMessage
} from '../../Global/ClearanceIssue/clearance-error-messages';

const Home = memo(() => {
  const user = useContext(UserContext);

  if (!user || user.isLoggedIn === false) {
    return <Layout>Loading...</Layout>;
  }

  if (user.banned) {
    return (
      <Layout>
        <chakra.div data-testid="banned-error">
          <ClearanceIssue type="error" message={bannedMessage} />
        </chakra.div>
      </Layout>
    );
  }

  if (user.inactive) {
    return (
      <Layout>
        <ClearanceIssue type="error" message={inactiveMessage} />
      </Layout>
    );
  }

  return (
    <Layout>
      <Tabs
        marginTop={{ base: '1vh' }}
        defaultIndex={0}
        borderBottomColor="transparent">
        {/* When swapping order of TabList and TabPanels to send Tablist to */}
        {/* bottom, specifying height(vh) on the Flex element is mandatory. */}
        <Flex direction="column">
          <Box>
            <TabList justifyContent="center">
              <Tab paddingY={0} margin={0} _focus={{ boxShadow: 'none' }}>
                <VStack>
                  <Icon as={IoHome} />
                  <span>Home</span>
                </VStack>
              </Tab>
              <Tab paddingY={0} margin={0} _focus={{ boxShadow: 'none' }}>
                <VStack>
                  <Icon as={FaDollarSign} />
                  <span>Préstamo</span>
                </VStack>
              </Tab>
            </TabList>
          </Box>
          <Spacer />
          <Box>
            <TabPanels>
              <TabPanel>
                <Flex
                  direction="column"
                  width={{ base: '90vw' }}
                  justifyItems="center">
                  <Center>
                    <HomeCard />
                  </Center>
                </Flex>
              </TabPanel>
              <TabPanel>
                {/* Preferring full ternary instead of && to avoid */}
                {/* displaying 0's on due to not specifying what to render */}
                {/* when condition is not met   */}

                <Center marginTop={{ base: '1vh' }}>
                  {user.emailConfirm ? (
                    <chakra.div data-testid="unverified-email-alert">
                      <ClearanceIssue
                        type="error"
                        message={unverifiedEmailMessage}
                      />
                    </chakra.div>
                  ) : null}
                  {!user.approved ? (
                    <chakra.div data-testid="validation-pending-alert">
                      <ClearanceIssue
                        type="error"
                        message={validationPendingMessage}
                      />
                    </chakra.div>
                  ) : null}
                  {user.unpaidPrime ? (
                    <chakra.div data-testid="unpaid-prime-alert">
                      <ClearanceIssue
                        type="error"
                        message={unpaidPrimeMessage}
                      />
                    </chakra.div>
                  ) : null}
                  {user.primeWithActiveLoan ? (
                    <chakra.div data-testid="prime-with-active-loan-alert">
                      <ClearanceIssue
                        type="error"
                        message={primeWithActiveLoanMessage}
                      />
                    </chakra.div>
                  ) : null}
                  {user.standardWithActiveLoan ? (
                    <chakra.div data-testid="standard-with-active-loan-alert">
                      <ClearanceIssue
                        type="error"
                        message={standardWithActiveLoanMessage}
                      />
                    </chakra.div>
                  ) : null}
                  {user.loanTokens === 0 ? (
                    <chakra.div data-testid="has-no-loan-tokens-alert">
                      <ClearanceIssue
                        type="error"
                        message={hasNoLoanTokensMessage}
                      />
                    </chakra.div>
                  ) : null}

                  {user.primeApprovedForLoan ? <LoanRequestFlow /> : null}
                  {user.standardApprovedForLoan ? <LoanRequestFlow /> : null}
                </Center>
              </TabPanel>
            </TabPanels>
          </Box>
        </Flex>
      </Tabs>
    </Layout>
  );
});

export default Home;
