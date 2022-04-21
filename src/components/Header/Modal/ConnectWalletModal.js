import { useShowOverlay } from "../../../hooks/Contexts/OverlayContext";

const ConnectWalletModal = (props) => {
  const showOverlay = useShowOverlay();

  return <>{showOverlay && <div className="overlay">{props.children}</div>}</>;
};

export default ConnectWalletModal;
