import React, { useContext, useState } from "react";

const OverlayContext = React.createContext();
const OverlayUpdateContext = React.createContext();

export function useShowOverlay() {
  return useContext(OverlayContext);
}

export function useOverlayUpdate() {
  return useContext(OverlayUpdateContext);
}

const OverlayProvider = ({ children }) => {
  const [showOverlay, setShowOverlay] = useState(false);

  function toggleShowOverlay() {
    setShowOverlay(!showOverlay);
  }

  return (
    <OverlayContext.Provider value={showOverlay}>
      <OverlayUpdateContext.Provider value={toggleShowOverlay}>
        {children}
      </OverlayUpdateContext.Provider>
    </OverlayContext.Provider>
  );
};

export default OverlayProvider;
