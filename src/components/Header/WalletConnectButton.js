import WalletLogo from "../../assets/Header/WalletLogo";
import { truncateAddress } from "../../utils/utils";

const WalletConnectButton = ({
  buttonClassName,
  logoClassName,
  onClick,
  account,
}) => (
  <button className={buttonClassName} onClick={onClick}>
    <WalletLogo className={logoClassName} />
    <span className="address">
      {account ? truncateAddress(account) : "Connect Wallet"}
    </span>
  </button>
);

export default WalletConnectButton;
