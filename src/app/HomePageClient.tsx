"use client";

import { useState } from "react";
import {
  Box,
  Button,
  Text,
  VStack,
  HStack,
  Spinner,
} from "@chakra-ui/react";
import { useWallet, WalletButton } from "@vechain/vechain-kit";
import { usePrivy } from "@vechain/vechain-kit";
import { useB3TRBalance } from "@/hooks/useB3TRBalance";
import { SendB3TRModal } from "@/components/SendB3TRModal";

export default function HomePageClient() {
  const { connectedWallet, connection } = useWallet();
  const { logout } = usePrivy();
  const isConnected = connection?.isConnected ?? false;
  const address = connectedWallet?.address ?? "";
  const shortAddr = address
    ? `${address.slice(0, 6)}...${address.slice(-4)}`
    : "";
  const { balance, isLoading: balanceLoading } = useB3TRBalance(
    isConnected ? address : undefined
  );
  const [sendOpen, setSendOpen] = useState(false);

  return (
<Box
  minH="100vh"
  display="flex"
  flexDirection="column"
  alignItems="center"
  justifyContent="center"
  px={4}
  position="relative"
  overflow="hidden"
  bgImage="url('https://images.unsplash.com/photo-1612806527197-42af2b64884a?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"
  bgSize="cover"
  bgPosition="center"
  bgRepeat="no-repeat"
>
      <Box position="absolute" top="-20%" right="-10%" w="500px" h="500px" borderRadius="full" bg="radial-gradient(circle, rgba(0,194,203,0.08) 0%, transparent 70%)" pointerEvents="none" />
      <Box position="absolute" bottom="-15%" left="-10%" w="400px" h="400px" borderRadius="full" bg="radial-gradient(circle, rgba(45,139,255,0.08) 0%, transparent 70%)" pointerEvents="none" />

      <Box position="fixed" top={0} left={0} right={0} px={6} py={4} display="flex" alignItems="center" justifyContent="space-between" bg="rgba(13,17,23,0.8)" backdropFilter="blur(12px)" borderBottom="1px solid rgba(48,54,61,0.5)" zIndex={100}>
        <HStack gap={2} align="center">
          <Box w="28px" h="28px" borderRadius="8px" bg="linear-gradient(135deg, #00c2cb, #2d8bff)" />
          <Text fontWeight="700" fontSize="sm" color="#e6edf3" letterSpacing="0.05em">GARDEN FRIENDS</Text>
        </HStack>

        {isConnected ? (
          <HStack gap={3}>
            <HStack gap={2} bg="#161b22" border="1px solid #30363d" borderRadius="full" px={4} py={2}>
              <Box w="8px" h="8px" borderRadius="full" bg="#00e676" />
              <Text fontFamily="monospace" fontSize="xs" color="#8b949e">{shortAddr}</Text>
            </HStack>
            <Button
              size="sm"
              variant="ghost"
              color="#e8eef5"
              _hover={{ color: "#ff6b6b" }}
              onClick={logout}
            >
              Disconnect
            </Button>
          </HStack>
        ) : (
          <WalletButton />
        )}
      </Box>

      <VStack gap={10} maxW="640px" w="full" textAlign="center" pt={16}>
        <VStack gap={4}>
          <Text fontWeight="700" fontSize="4xl" lineHeight={1.1} color="#f5fbfc">GARDEN FRIENDS</Text>
          <Text color="#e1e9f3" fontSize="md" maxW="400px">Vegetable gardening isn’t just about growing your own food – it also has a positive impact on the environment. From reducing carbon footprint to promoting biodiversity and sustainable living, vegetable gardens play a crucial role in creating a healthier planet.</Text>
        </VStack>

        {false ? (
          <Box bg="#161b22" border="1px solid #30363d" borderRadius="20px" p={8} w="full">
            <VStack gap={3}>
              <Spinner color="#00c2cb" size="lg" />
              <Text color="#eaf0f7" fontSize="sm" fontFamily="monospace">Connecting...</Text>
            </VStack>
          </Box>
        ) : isConnected ? (
          <Box bg="#161b22" border="1px solid #30363d" borderRadius="20px" p={8} w="full" boxShadow="0 0 40px rgba(0,194,203,0.08)">
            <VStack gap={6} align="stretch">
              <Box bg="#14532d" borderRadius="12px" p={4} border="1px solid #21262d">
                <Text fontSize="xs" color="#e7edf4" fontFamily="monospace" mb={1} textTransform="uppercase" letterSpacing="0.1em">Connected Address</Text>
                <Text fontFamily="monospace" fontSize="sm" color="#e6edf3" wordBreak="break-all">{address}</Text>
              </Box>
              <Box bg="linear-gradient(135deg, rgba(0,194,203,0.08), rgba(45,139,255,0.08))" borderRadius="16px" p={6} border="1px solid rgba(0,194,203,0.2)" textAlign="center">
                <Text fontSize="xs" color="#e3eaf1" fontFamily="monospace" textTransform="uppercase" letterSpacing="0.12em" mb={2}>B3TR Balance</Text>
                {balanceLoading ? (
                  <Spinner color="#00c2cb" size="md" />
                ) : (
                  <HStack justify="center" align="baseline" gap={2}>
                    <Text fontWeight="700" fontSize="3xl" color="#00c2cb">{balance}</Text>
                    <Text fontSize="sm" color="#8b949e" fontFamily="monospace" fontWeight="700">B3TR</Text>
                  </HStack>
                )}
              </Box>
              <Button onClick={() => setSendOpen(true)} bg="linear-gradient(135deg, #00c2cb, #2d8bff)" color="white" fontWeight="700" fontSize="sm" h="52px" borderRadius="14px" _hover={{ opacity: 0.9, transform: "translateY(-2px)" }} transition="all 0.25s">
                Send B3TR
              </Button>
            </VStack>
          </Box>
        ) : (
          <Box bg="#161b22" border="1px dashed #30363d" borderRadius="20px" p={10} w="full">
            <VStack gap={4}>
              <Text color="#484f58" fontSize="sm" fontFamily="monospace">No wallet connected</Text>
              <WalletButton />
              <Text color="#484f58" fontSize="xs" maxW="320px">Supports VeWorld, WalletConnect, Google, and email login via Privy</Text>
            </VStack>
          </Box>
        )}

        <HStack gap={4} flexWrap="wrap" justify="center">
          {["VeChain Kit", "Privy", "Chakra UI v3", "Next.js 14"].map((label) => (
            <Box key={label} bg="#161b22" border="1px solid #21262d" borderRadius="full" px={3} py={1}>
              <Text fontSize="10px" color="#484f58" fontFamily="monospace">{label}</Text>
            </Box>
          ))}
        </HStack>
      </VStack>

      <SendB3TRModal isOpen={sendOpen} onClose={() => setSendOpen(false)} senderAddress={address} />
    </Box>
  );
}