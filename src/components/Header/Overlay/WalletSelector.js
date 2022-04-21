import MetamaskLogo from "../../../assets/Header/Overlay/MetamaskLogo";
import WCLogo from "../../../assets/Header/Overlay/WCLogo";
import ConnectionButton from "../Button/ConnectionButton";
import { useOverlayUpdate } from "../../../hooks/Contexts/OverlayContext";
import { useWeb3React } from "@web3-react/core";
import { connectors } from "../../../config/connectors/connectors";
import TitleHeader from "../../Common/TitleHeader";

const WalletSelector = ({ className }) => {
  const toggleShowOverlay = useOverlayUpdate();
  const { activate, deactivate, active } = useWeb3React();
  const setProvider = (type) => {
    window.localStorage.setItem("provider", type);
  };

  const provider = window.localStorage.getItem("provider");

  const connectWallet = (connector, provider) => {
    activate(connector);
    setProvider(provider);
    toggleShowOverlay();
  };

  const disconnect = () => {
    deactivate();
    toggleShowOverlay();
  };

  return (
    <div className={className}>
      <TitleHeader
        className={"connect-wallet-header"}
        title={"Wallet"}
        onClick={toggleShowOverlay}
      />
      <div className="button-container">
        <ConnectionButton
          className={
            active && provider === "Metamask"
              ? "connection-button clicked"
              : "connection-button"
          }
          logo={<MetamaskLogo />}
          wallet={"Metamask"}
          onClick={
            !active
              ? () => {
                  connectWallet(connectors.injected, "Metamask");
                }
              : () => {
                  disconnect();
                }
          }
        />
        <ConnectionButton
          className={
            active && provider === "Wallet Connect"
              ? "connection-button clicked"
              : "connection-button"
          }
          logo={<WCLogo className={"wallet-connect"} width={50} height={50} />}
          wallet={"Wallet Connect"}
          onClick={() => {
            connectWallet(connectors.walletConnect, "Wallet Connect");
          }}
        />
      </div>
    </div>
  );
};

export default WalletSelector;
