import React from 'react';
import {
  chakra,
  Center,
  Box,
  Flex,
  HStack,
  Image,
  Button,
  useDisclosure,
  VStack,
  IconButton,
  CloseButton
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { AiOutlineMenu, AiOutlineLogout } from 'react-icons/ai';
import useUser from '../../../lib/useUser';
import fetchJson from '../../../lib/fetchJson';
// Chakra Link is preferred over Link, but for now it does not work properly
// with react 17.0.0
// import { Link as ChakraLink } from '@chakra-ui/react';

const Navbar = ({ publicContent }) => {
  const mobileNav = useDisclosure();
  const { mutateUser } = useUser();
  const router = useRouter();

  if (publicContent) {
    return (
      <Box shadow="md">
        <chakra.header
          background="brand.primary"
          minWidth={{
            base: '360px'
          }}
          borderColor="brand.primary"
          borderBottomWidth={1}
          width="full"
          paddingX={{ base: 2, sm: 4 }}
          paddingY={4}
        >
          <Flex alignItems="center" justifyContent="space-between" mx="auto">
            <HStack spacing={4} display="flex" alignItems="center">
              <Image
                alt="Logo de Casham"
                width="50"
                heigth="25"
                src="/images/brand_logo.png"
              />
            </HStack>
            <HStack spacing={3} display="flex" alignItems="center" />
          </Flex>
        </chakra.header>
      </Box>
    );
  }

  return (
    <>
      <Box shadow="md">
        <chakra.header
          background="brand.primary"
          minWidth={{
            base: '360px'
          }}
          borderColor="brand.primary"
          borderBottomWidth={1}
          width="full"
          paddingX={{ base: 2, sm: 4 }}
          paddingY={4}
        >
          <Flex
            alignItems="center"
            justifyContent="space-between"
            marginX="auto"
          >
            <HStack spacing={4} display="flex" alignItems="center">
              <Box display={{ base: 'inline-flex', md: 'none' }}>
                <IconButton
                  display={{ base: 'flex', md: 'none' }}
                  aria-label="Open menu"
                  fontSize="20px"
                  color="gray.200"
                  variant="ghost"
                  _hover={{ bg: 'gray.200', color: 'brand.primary' }}
                  icon={<AiOutlineMenu />}
                  onClick={mobileNav.onOpen}
                />
                <VStack
                  position="absolute"
                  top={0}
                  left={0}
                  right={0}
                  display={mobileNav.isOpen ? 'flex' : 'none'}
                  flexDirection="column"
                  padding={2}
                  paddingBottom={4}
                  margin={2}
                  background="brand.primary"
                  spacing={3}
                  rounded="sm"
                  shadow="sm"
                >
                  <CloseButton
                    color="gray.200"
                    aria-label="Close menu"
                    justifySelf="self-start"
                    onClick={mobileNav.onClose}
                  />
                  <Button
                    color="gray.200"
                    width="full"
                    variant="ghost"
                    href="/api/logout"
                    onClick={async e => {
                      e.preventDefault();
                      await mutateUser(fetchJson('/api/logout'));
                      router.push('/login');
                    }}
                    leftIcon={<AiOutlineLogout />}
                  >
                    Cerrar sesión
                  </Button>
                </VStack>
              </Box>
              <Center paddingTop={{ base: '.8vh' }}>
                <Image
                  alt="Logo de Casham"
                  maxWidth={{ base: '25vw', md: '12vw', lg: '8vw' }}
                  src="/images/brand_logo.png"
                />
              </Center>
            </HStack>
            <HStack spacing={3} display="flex" alignItems="center">
              <HStack spacing={3} display={{ base: 'none', md: 'inline-flex' }}>
                <Button
                  variant="ghost"
                  color="gray.200"
                  _hover={{ bg: 'gray.200', color: 'brand.primary' }}
                  href="/api/logout"
                  size="sm"
                  onClick={async e => {
                    e.preventDefault();
                    await mutateUser(fetchJson('/api/logout'));
                    router.push('/login');
                  }}
                  leftIcon={<AiOutlineLogout />}
                >
                  Cerrar sesión
                </Button>
              </HStack>
            </HStack>
          </Flex>
        </chakra.header>
      </Box>
    </>
  );
};

export default Navbar;
