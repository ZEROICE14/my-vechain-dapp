"use client";

import { useState } from "react";
import {
  Box,
  Button,
  Input,
  Text,
  VStack,
  HStack,
  Spinner,
} from "@chakra-ui/react";

interface SendB3TRModalProps {
  isOpen: boolean;
  onClose: () => void;
  senderAddress: string;
}

const B3TR_CONTRACT = "0x5ef79995FE8a89e0812330E4378eB2660ceDe699";

export function SendB3TRModal({
  isOpen,
  onClose,
  senderAddress,
}: SendB3TRModalProps) {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [txId, setTxId] = useState("");
  const [errMsg, setErrMsg] = useState("");

  if (!isOpen) return null;

  async function handleSend() {
    if (!recipient || !amount) return;
    setStatus("sending");
    setErrMsg("");

    try {
      // Build ERC-20 transfer calldata
      // transfer(address,uint256) selector = 0xa9059cbb
      const selector = "a9059cbb";
      const paddedAddr = recipient.toLowerCase().replace("0x", "").padStart(64, "0");
      const amountWei = BigInt(Math.floor(parseFloat(amount) * 1e18));
      const paddedAmt = amountWei.toString(16).padStart(64, "0");
      const data = `0x${selector}${paddedAddr}${paddedAmt}`;

      // Use Connex / VeWorld injected object if available
      const connex = (window as unknown as { connex?: ConnexLike }).connex;
      if (!connex) throw new Error("No wallet detected. Please connect VeWorld.");

      const clause = {
        to: B3TR_CONTRACT,
        value: "0x0",
        data,
      };

      const tx = connex.vendor
        .sign("tx", [clause])
        .comment(`Send ${amount} B3TR to ${recipient.slice(0, 8)}…`);

      const result = await tx.request();
      setTxId(result.txid);
      setStatus("success");
    } catch (e: unknown) {
      setErrMsg(e instanceof Error ? e.message : "Transaction failed");
      setStatus("error");
    }
  }

  function handleClose() {
    setStatus("idle");
    setRecipient("");
    setAmount("");
    setTxId("");
    setErrMsg("");
    onClose();
  }

  return (
    // Backdrop
    <Box
      position="fixed"
      inset={0}
      bg="blackAlpha.800"
      zIndex={1000}
      display="flex"
      alignItems="center"
      justifyContent="center"
      onClick={handleClose}
    >
      {/* Modal panel */}
      <Box
        bg="#161b22"
        border="1px solid"
        borderColor="#30363d"
        borderRadius="20px"
        p={8}
        w="full"
        maxW="440px"
        mx={4}
        onClick={(e) => e.stopPropagation()}
        boxShadow="0 0 40px rgba(0,194,203,0.15)"
      >
        <VStack gap={6} align="stretch">
          <HStack justify="space-between" align="center">
            <Text
              fontFamily="Space Mono, monospace"
              fontWeight="700"
              fontSize="lg"
              color="#00c2cb"
            >
              Send B3TR
            </Text>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClose}
              color="#8b949e"
              _hover={{ color: "#e6edf3" }}
            >
              ✕
            </Button>
          </HStack>

          {status === "success" ? (
            <VStack gap={3} py={4}>
              <Text fontSize="3xl">✅</Text>
              <Text color="#00e676" fontWeight="600">
                Transaction sent!
              </Text>
              <Text
                fontSize="xs"
                color="#8b949e"
                fontFamily="monospace"
                wordBreak="break-all"
                textAlign="center"
              >
                {txId}
              </Text>
              href={`https://explore.vechain.org/transactions/${txId}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#00c2cb", fontSize: "14px" }}
            > 
              View on Explorer ↗
            </a>
            </VStack>
          ) : (
            <>
              <VStack gap={2} align="stretch">
                <Text fontSize="sm" color="#8b949e" fontFamily="monospace">
                  Recipient address
                </Text>
                <Input
                  placeholder="0x..."
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  fontFamily="monospace"
                  fontSize="sm"
                  bg="#0d1117"
                  border="1px solid #30363d"
                  color="#e6edf3"
                  _placeholder={{ color: "#484f58" }}
                  _focus={{ borderColor: "#00c2cb", boxShadow: "0 0 0 1px #00c2cb" }}
                  borderRadius="10px"
                  px={4}
                  h="44px"
                />
              </VStack>

              <VStack gap={2} align="stretch">
                <Text fontSize="sm" color="#8b949e" fontFamily="monospace">
                  Amount (B3TR)
                </Text>
                <Input
                  placeholder="0.00"
                  type="number"
                  min="0"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  fontFamily="monospace"
                  fontSize="sm"
                  bg="#0d1117"
                  border="1px solid #30363d"
                  color="#e6edf3"
                  _placeholder={{ color: "#484f58" }}
                  _focus={{ borderColor: "#00c2cb", boxShadow: "0 0 0 1px #00c2cb" }}
                  borderRadius="10px"
                  px={4}
                  h="44px"
                />
              </VStack>

              {errMsg && (
                <Text fontSize="xs" color="#ff6b6b" fontFamily="monospace">
                  ⚠ {errMsg}
                </Text>
              )}

              <Button
                onClick={handleSend}
                disabled={status === "sending" || !recipient || !amount}
                bg="linear-gradient(135deg, #00c2cb, #2d8bff)"
                color="white"
                fontFamily="Space Mono, monospace"
                fontWeight="700"
                fontSize="sm"
                h="48px"
                borderRadius="12px"
                _hover={{
                  bg: "linear-gradient(135deg, #00d4de, #4a9fff)",
                  transform: "translateY(-1px)",
                  boxShadow: "0 8px 24px rgba(0,194,203,0.3)",
                }}
                _active={{ transform: "translateY(0)" }}
                transition="all 0.2s"
              >
                {status === "sending" ? (
                  <HStack gap={2}>
                    <Spinner size="sm" />
                    <Text>Sending…</Text>
                  </HStack>
                ) : (
                  "Send B3TR →"
                )}
              </Button>
            </>
          )}
        </VStack>
      </Box>
    </Box>
  );
}

// Minimal Connex type shim
interface ConnexLike {
  vendor: {
    sign: (
      type: string,
      clauses: { to: string; value: string; data: string }[]
    ) => {
      comment: (msg: string) => { request: () => Promise<{ txid: string }> };
    };
  };
}
