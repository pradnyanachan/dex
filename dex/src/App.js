import "./App.css";
import Header from "./components/Header";
import Swap from "./components/Swap";
import Tokens from "./components/Tokens";
import LivePrices from "./components/LivePrices"; // New component
import { Routes, Route } from "react-router-dom";
import { useConnect, useAccount } from "wagmi";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { useSpring, animated } from 'react-spring'; // For animations
import axios from "axios";

function App() {
  const { address, isConnected } = useAccount();
  const { connect, error } = useConnect({
    connector: new MetaMaskConnector(),
  });

  axios.get('https://api.1inch.io/v5.0/1/approve/allowance', {
    withCredentials: true
  });
  
  

  const handleConnect = async () => {
    try {
      await connect();
    } catch (err) {
      console.error("Failed to connect:", err);
      // You can add user-friendly error messages here
      if (err.name === "ConnectorNotFoundError") {
        alert("MetaMask not found. Please install MetaMask and try again.");
      } else {
        alert("Failed to connect. Please make sure MetaMask is unlocked and try again.");
      }
    }
  };

  const fadeIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 1000 }
  });

  return (
    <animated.div style={fadeIn} className="App">
      <Header connect={handleConnect} isConnected={isConnected} address={address} />
      <div className="mainWindow">
        <Routes>
          <Route path="/" element={
            <>
              <Swap isConnected={isConnected} address={address} />
              <LivePrices />
            </>
          } />
          <Route path="/tokens" element={<Tokens />} />
        </Routes>
      </div>
    </animated.div>
  );
}

export default App;
