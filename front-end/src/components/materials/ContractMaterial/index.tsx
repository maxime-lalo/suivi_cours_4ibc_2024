import { formatUnits, parseEther, parseUnits } from "viem";
import {
  useReadBasicContractGetValue,
  useWriteBasicContractSetPayableValue,
} from "../../../WagmiGenerated";
import { useAccount } from "wagmi";

export default function ContractMaterial() {
  const { data } = useReadBasicContractGetValue();
  const { writeContractAsync: writeContractAsyncPayable } =
    useWriteBasicContractSetPayableValue();
  const { isConnected } = useAccount();
  return (
    <div>
      {data !== undefined && <div>{formatUnits(data, 0)}</div>}
      {data === undefined && <div>Loading contract value...</div>}
      {isConnected && (
        <div>
          <button
            onClick={() => {
              writeContractAsyncPayable({
                args: [parseUnits("500", 0)],
                value: parseEther("0.01"),
              }).then((hash) => {
                alert("Transaction sent: " + hash);
              });
            }}
          >
            Modifier le contrat
          </button>
        </div>
      )}
    </div>
  );
}
