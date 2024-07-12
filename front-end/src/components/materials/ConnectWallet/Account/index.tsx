import { useAccount, useDisconnect, useEnsAvatar, useEnsName } from "wagmi";
import Balance from "./Balance";

export default function Account() {
    const { address } = useAccount();
    const { disconnect } = useDisconnect();
    const { data: ensName } = useEnsName({ address });
    const { data: ensAvatar } = useEnsAvatar({ name: ensName! });

    return (
        <div>
            {ensAvatar && <img alt="ENS Avatar" src={ensAvatar} />}
            {address && (
                <div>{ensName ? `${ensName} (${address})` : address}</div>
            )}
            {address && <Balance address={address} />}
            <button onClick={() => disconnect()}>Disconnect</button>
        </div>
    );
}
