import React, { useContext, useState } from "react";

const OverlayContext = React.createContext();

export function useShowOverlay() {
  return useContext(OverlayContext);
}

const OverlayProvider = ({ children }) => {
  const [showOverlay, setShowOverlay] = useState(false);

  const toggleShowOverlay = () => {
    setShowOverlay((showOverlay) => !showOverlay);
  };

  return (
    <OverlayContext.Provider value={[showOverlay, toggleShowOverlay]}>
      {children}
    </OverlayContext.Provider>
  );
};

export default OverlayProvider;
