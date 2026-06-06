"use client";

import { useEffect, useState } from "react";

// B3TR token contract on VeChain mainnet
const B3TR_CONTRACT = "0x5ef79995FE8a89e0812330E4378eB2660ceDe699";

// ERC-20 balanceOf ABI fragment
const BALANCE_OF_ABI = [
  {
    name: "balanceOf",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "account", type: "address" }],
    outputs: [{ name: "", type: "uint256" }],
  },
] as const;

export function useB3TRBalance(address?: string) {
  const [balance, setBalance] = useState<string>("0");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!address) {
      setBalance("0");
      return;
    }

    async function fetchBalance() {
      setIsLoading(true);
      setError(null);
      try {
        // Use VeChain's Thor REST API to call balanceOf
        const encoded = encodeBalanceOf(address!);
        const res = await fetch(
          `https://mainnet.vechain.org/accounts/${B3TR_CONTRACT}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              value: "0x0",
              data: encoded,
              caller: address,
            }),
          }
        );
        if (!res.ok) throw new Error("RPC call failed");
        const json = await res.json();
        const raw: string = json.data ?? "0x0";
        // Parse the hex uint256 → format with 18 decimals
        const bn = BigInt(raw);
        const formatted = formatUnits(bn, 18);
        setBalance(formatted);
      } catch (e: unknown) {
        setError(e instanceof Error ? e.message : "Unknown error");
        setBalance("—");
      } finally {
        setIsLoading(false);
      }
    }

    fetchBalance();
    // Refresh every 15s
    const interval = setInterval(fetchBalance, 15_000);
    return () => clearInterval(interval);
  }, [address]);

  return { balance, isLoading, error };
}

// Minimal ABI encoding for balanceOf(address)
function encodeBalanceOf(address: string): string {
  // keccak256("balanceOf(address)") first 4 bytes = 0x70a08231
  const selector = "70a08231";
  // Pad address to 32 bytes
  const padded = address.toLowerCase().replace("0x", "").padStart(64, "0");
  return `0x${selector}${padded}`;
}

// Format a BigInt with `decimals` decimal places, 4 significant decimals shown
function formatUnits(value: bigint, decimals: number): string {
  const divisor = 10n ** BigInt(decimals);
  const whole = value / divisor;
  const remainder = value % divisor;
  const fracStr = remainder.toString().padStart(decimals, "0").slice(0, 4);
  const wholeStr = whole.toLocaleString();
  return `${wholeStr}.${fracStr}`;
}
