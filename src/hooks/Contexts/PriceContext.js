import React, { useContext, useState, useEffect, useCallback } from "react";
import { fetchPairPrice } from "../../utils/utils";

const PriceContext = React.createContext();
const PriceUpdateContext = React.createContext();

export function usePrice() {
  return useContext(PriceContext);
}

export function usePriceUpdate() {
  return useContext(PriceUpdateContext);
}

const PriceProvider = ({ children }) => {
  const [price, setPrice] = useState({
    ethPerIXSPrice: "0.00000",
    ixsPerETHPrice: "0.00000",
  });

  const priceUpdate = (obj) => {
    setPrice(obj);
  };

  const getPairPrice = useCallback(async () => {
    var pairPrice = await fetchPairPrice();
    setPrice(pairPrice);
  }, []);

  useEffect(() => {
    getPairPrice();
  }, [getPairPrice]);

  return (
    <PriceContext.Provider value={price}>
      <PriceUpdateContext.Provider value={priceUpdate}>
        {children}
      </PriceUpdateContext.Provider>
    </PriceContext.Provider>
  );
};

export default PriceProvider;
