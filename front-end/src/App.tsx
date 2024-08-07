import { WagmiProvider } from "wagmi";
import Routing from "./Routing";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import WagmiConfig from "./config/BlockchainConfig/WagmiConfig";
import { UserProvider } from "./contexts/UserProvider";

const queryClient = new QueryClient();

function App() {
    return (
        <UserProvider>
            <WagmiProvider config={WagmiConfig}>
                <QueryClientProvider client={queryClient}>
                    <Routing />
                </QueryClientProvider>
            </WagmiProvider>
        </UserProvider>
    );
}

export default App;
