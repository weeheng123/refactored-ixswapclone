import React, { useContext, useState, useEffect, useCallback } from "react";
import { fetchPairPrice } from "../../utils/utils";
import { useWeb3React } from "@web3-react/core";

const PriceContext = React.createContext();

export function usePrice() {
  return useContext(PriceContext);
}

const PriceProvider = ({ children }) => {
  const { library } = useWeb3React();

  const [price, setPrice] = useState({
    ethPerIXSPrice: "0",
    ixsPerETHPrice: "0",
  });

  const getPairPrice = useCallback(async () => {
    let pairPrice = await fetchPairPrice(library);
    setPrice(pairPrice);
  }, [library]);

  useEffect(() => {
    getPairPrice(library);
  }, [library, getPairPrice]);

  return (
    <PriceContext.Provider value={price}>{children}</PriceContext.Provider>
  );
};

export default PriceProvider;
