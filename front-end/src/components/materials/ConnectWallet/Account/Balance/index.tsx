import { Address, formatEther } from "viem";
import { useBalance } from "wagmi";

type IProps = {
  address: Address;
};
export default function Balance(props: IProps) {
  const { data } = useBalance({
    address: props.address,
  });

  if (!data) return null;
  return <div>{`${formatEther(data.value)} ${data.symbol}`}</div>;
}
