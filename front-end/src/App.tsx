import { WagmiProvider } from "wagmi";
import Routing from "./Routing";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import WagmiConfig from "./config/BlockchainConfig/WagmiConfig";

const queryClient = new QueryClient();

function App() {
  return (
    <WagmiProvider config={WagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <Routing />
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;
