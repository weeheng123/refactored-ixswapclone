import ConnectWalletModal from "../../components/Header/Modal/ConnectWalletModal";
import WalletSelector from "../../components/Header/Overlay/WalletSelector";
import "./Overlay.scss";

const Overlay = () => {
  return (
    <ConnectWalletModal>
      <WalletSelector className={"connect-wallet"} />
    </ConnectWalletModal>
  );
};

export default Overlay;
