import "./App.scss";
import Header from "./layout/Header/";
import Background from "./layout/Background";
import Main from "./layout/Main";
import AddLiquidity from "./layout/AddLiquidity";
import Footer from "./layout/Footer";
import Overlay from "./layout/Overlay/Overlay";
import OverlayProvider from "./hooks/Contexts/OverlayContext";
import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import PriceProvider from "./hooks/Contexts/PriceContext";
import BalanceProvider from "./hooks/Contexts/BalanceContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  const getLibrary = (provider) => {
    const library = new Web3Provider(provider);
    library.pollingInterval = 8000;
    return library;
  };
  return (
    <>
      <Router>
        <Web3ReactProvider getLibrary={getLibrary}>
          <OverlayProvider>
            <Background />
            <Header />
            <Overlay />
          </OverlayProvider>
          <BalanceProvider>
            <PriceProvider>
              <Routes>
                <Route path="/add/liquidity" element={<AddLiquidity />} />
                <Route path="/" element={<Main />} />
              </Routes>
            </PriceProvider>
          </BalanceProvider>
          <Footer />
        </Web3ReactProvider>
      </Router>
    </>
  );
};

export default App;
