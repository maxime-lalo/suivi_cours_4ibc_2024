import { defineConfig } from "@wagmi/cli";
import { react } from "@wagmi/cli/plugins";
//npx wagmi generate
export default defineConfig({
  out: "src/WagmiGenerated.ts",
  contracts: [
    {
      name: "BasicContract",
      address: "0xDe4166C67C54070f1a0b4D9d60993429c85b3368",
      abi: [
        {
          inputs: [
            { internalType: "uint256", name: "_value", type: "uint256" },
          ],
          stateMutability: "nonpayable",
          type: "constructor",
        },
        {
          inputs: [],
          name: "getPayableValue",
          outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "getValue",
          outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "payableValue",
          outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            { internalType: "uint256", name: "_value", type: "uint256" },
          ],
          name: "setPayableValue",
          outputs: [],
          stateMutability: "payable",
          type: "function",
        },
        {
          inputs: [
            { internalType: "uint256", name: "_value", type: "uint256" },
          ],
          name: "setValue",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "value",
          outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          stateMutability: "view",
          type: "function",
        },
      ],
    },
  ],
  plugins: [react()],
});
