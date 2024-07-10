import { Address, getContract, isAddress, parseEther } from "viem";
import BlockchainClient from "../BlockchainClient";
import BasicContractJson from "../../abis/BasicContract.json";

export default class BasicContract {
	private static basicContract: BasicContract;

	private contract = getContract({
		address: BasicContractJson.address as Address,
		abi: BasicContractJson.abi,
		client: {
			public: BlockchainClient.getInstance().publicClient,
			wallet: BlockchainClient.getInstance().walletClient,
		},
	});

	public static getInstance() {
		if (!this.basicContract) {
			this.basicContract = new BasicContract();
		}
		return this.basicContract;
	}

	public async getValue() {
		return this.contract.read.getValue() as Promise<bigint>;
	}

	public async setValue(value: number) {
		return this.contract.write.setValue([value]);
	}

	public async setPayableValue(value: number) {
		return this.contract.write.setPayableValue([value], {
			value: parseEther("0.01"),
		});
	}
}
