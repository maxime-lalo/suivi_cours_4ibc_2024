import { Address, formatUnits } from "viem";
import BlockchainClient from "../blockchain/BlockchainClient";
import BasicContract from "../blockchain/contracts/BasicContract";

export default class BlockchainService {
	private static blockchainService: BlockchainService;
	private blockchainClient: BlockchainClient = BlockchainClient.getInstance();
	private basicContract = BasicContract.getInstance();

	public static getInstance() {
		if (!this.blockchainService) {
			this.blockchainService = new BlockchainService();
		}
		return this.blockchainService;
	}

	public async getBlockNumber() {
		return formatUnits(await this.blockchainClient.publicClient.getBlockNumber(), 0);
	}

	public getWalletAddress() {
		return this.blockchainClient.walletClient.account.address;
	}

	public async getBalance() {
		return formatUnits(
			await this.blockchainClient.publicClient.getBalance({
				address: this.blockchainClient.walletClient.account.address,
			}),
			0,
		);
	}

	public async getContractValue() {
		return formatUnits(await this.basicContract.getValue(), 0);
	}

	public async setContractValue(value: number) {
		return this.basicContract.setValue(value);
	}

	public setPayableValue(value: number) {
		return this.basicContract.setPayableValue(value);
	}

	public verifySignature(messageToSign: string, signature: string, address: string) {
		return this.blockchainClient.publicClient
			.verifyMessage({
				address: address as Address,
				message: messageToSign,
				signature: signature as Address,
			})
			.catch((e) => {
				console.error(e);
			});
	}
}
