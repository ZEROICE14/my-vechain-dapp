'use client';

import { ReactNode } from "react";
import { ChakraProvider, useChakraContext } from "@chakra-ui/react";
import { ThemeProvider } from "next-themes";
import { VeChainKitProvider } from "@vechain/vechain-kit";
import { system } from "@/lib/theme";

function VeChainKitWrapper({ children }: { children: ReactNode }) {
  const chakra = useChakraContext();
  const kitTheme = {
    colors: {
      primary:    chakra.token.var("colors.brand.500"),
      secondary:  chakra.token.var("colors.vechain.teal"),
      background: chakra.token.var("colors.bg.canvas"),
      surface:    chakra.token.var("colors.bg.card"),
      text:       chakra.token.var("colors.text.primary"),
      textMuted:  chakra.token.var("colors.text.muted"),
      border:     chakra.token.var("colors.border.default"),
    },
  };
  return (
    <VeChainKitProvider
      privy={{
        appId: process.env.NEXT_PUBLIC_PRIVY_APP_ID ?? "",
        loginMethods: ["google", "email"],
        appearance: {
          walletList: ["detected_wallets"],
          theme: "dark",
        },
        embeddedWallets: {
          createOnLogin: "users-without-wallets",
        },
      }}
      feeDelegation={{
        delegatorUrl: process.env.NEXT_PUBLIC_DELEGATOR_URL ?? "https://sponsor-testnet.vechain.energy",
        delegateAllTransactions: false,
      }}
       loginMethods={[
        { method: "google" },
        { method: "email" },
        { method: "veworld" },
      ]}  
      dappKit={{
        allowedWallets: ["veworld", "walletconnect", "sync2"],
        walletConnectOptions: {
          projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ?? "",
          metadata: {
            name: "my-vechain-dapp",
            description: "A VeChain dApp",
            url: "https://localhost:3000",
            icons: ["https://avatars.githubusercontent.com/u/89985812"],
          },
        },
      }}
      network={{
        type: (process.env.NEXT_PUBLIC_VECHAIN_NETWORK as "main" | "test") ?? "main",
      }}
    >
      {children}
    </VeChainKitProvider>
  );
}

export default function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <ChakraProvider value={system}>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem={false}
        disableTransitionOnChange
      >
        <VeChainKitWrapper>{children}</VeChainKitWrapper>
      </ThemeProvider>
    </ChakraProvider>
  );
}