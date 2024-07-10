import { createPublicClient, createWalletClient, http } from "viem";
import { mnemonicToAccount, privateKeyToAccount } from "viem/accounts";
import { mainnet, sepolia } from "viem/chains";

export default class BlockchainClient {
	private static blockchainClient: BlockchainClient;

	public static getInstance() {
		if (!this.blockchainClient) {
			this.blockchainClient = new BlockchainClient();
		}
		return this.blockchainClient;
	}

	public publicClient = createPublicClient({
		chain: sepolia,
		transport: http(),
	});

	public walletClient = createWalletClient({
		chain: sepolia,
		transport: http(),
		account: privateKeyToAccount(`0x${process.env.WALLET_PRIVATE_KEY}`),
	});
}
