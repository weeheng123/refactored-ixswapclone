import { parseEther } from "ethers/lib/utils";
import React, { useContext, useEffect, useState, useCallback } from "react";
import { getTokenBalance } from "../../utils/utils";

const BalanceContext = React.createContext();

export function useBalance() {
  return useContext(BalanceContext);
}

const BalanceProvider = ({ children }) => {
  const [balance, setBalance] = useState({
    ethTokenBalance: parseEther("0"),
    ixsTokenBalance: parseEther("0"),
  });

  const switchNetwork = useCallback(async () => {
    const chainId = 1;

    if (window.ethereum.networkVersion !== chainId) {
      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x1" }],
        });
      } catch (error) {
        alert("IXSwap only works on mainnet");
      }
    }
  }, []);

  const fetchTokenBalance = useCallback(async () => {
    try {
      let tokenBalance = await getTokenBalance();
      setBalance(tokenBalance);
    } catch (error) {
      switchNetwork();
    }
  }, [switchNetwork]);

  useEffect(() => {
    switchNetwork();
    fetchTokenBalance();
  }, [switchNetwork, fetchTokenBalance]);

  return (
    <BalanceContext.Provider value={balance}>
      {children}
    </BalanceContext.Provider>
  );
};

export default BalanceProvider;
