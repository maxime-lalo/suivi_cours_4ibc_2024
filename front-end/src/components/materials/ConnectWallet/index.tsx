import { useAccount, useSignMessage } from "wagmi";
import { WalletOptions } from "./WalletOptions";
import Account from "./Account";
import { useContext, useEffect } from "react";
import { UserContext } from "../../../contexts/UserProvider";
import AuthenticationApi from "../../../api/AuthenticationApi";
import VerifyWalletRequestResource from "common/Authentication/VerifyWalletRequestResource";

export default function ConnectWallet() {
    const { isConnected } = useAccount();

    const { data, signMessage } = useSignMessage();
    const { address } = useAccount();
    const { user } = useContext(UserContext);
    useEffect(() => {
        if (isConnected && user && !user.walletAddress && user.messageToSign) {
            console.log("Sign message");
            signMessage({
                message: user.messageToSign,
            });
        }
    }, [isConnected, signMessage, user]);

    useEffect(() => {
        if (!data || !address) return;
        AuthenticationApi.getInstance().verifyWallet(
            VerifyWalletRequestResource.hydrate<VerifyWalletRequestResource>({
                signature: data as string,
                walletAddress: address as string,
            })
        );
    }, [address, data]);

    if (isConnected) return <Account />;
    return <WalletOptions />;
}
