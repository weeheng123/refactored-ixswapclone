import React, { useContext, useEffect, useState, useCallback } from "react";
import { getTokenBalance } from "../../utils/utils";

const BalanceContext = React.createContext();
const BalanceUpdateContext = React.createContext();

export function useBalance() {
  return useContext(BalanceContext);
}

export function useBalanceUpdate() {
  return useContext(BalanceUpdateContext);
}

const BalanceProvider = ({ children }) => {
  const [balance, setBalance] = useState({
    ethTokenBalance: "0.00000",
    ixsTokenBalance: "0.00000",
  });

  const balanceUpdate = (obj) => {
    setBalance(obj);
  };

  const fetchTokenBalance = useCallback(async () => {
    try {
      var tokenBalance = await getTokenBalance();
      setBalance(tokenBalance);
    } catch (error) {
      switchNetwork();
    }
  }, []);

  const switchNetwork = async () => {
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
  };

  useEffect(() => {
    switchNetwork();
    fetchTokenBalance();
  }, [fetchTokenBalance]);

  return (
    <BalanceContext.Provider value={balance}>
      <BalanceUpdateContext.Provider value={balanceUpdate}>
        {children}
      </BalanceUpdateContext.Provider>
    </BalanceContext.Provider>
  );
};

export default BalanceProvider;
