import "./index.scss";
import Brand from "../../components/Header/Brand";
import IXSwapLogo from "../../assets/Header/IXSwapLogo";
import UniswapLink from "../../components/Header/UniswapLink";
import WalletConnectButton from "../../components/Header/WalletConnectButton";
import { useOverlayUpdate } from "../../hooks/Contexts/OverlayContext";
import { useWeb3React } from "@web3-react/core";

const Header = () => {
  const toggleShowOverlay = useOverlayUpdate();
  const { account } = useWeb3React();
  return (
    <header className="header">
      <div className="container">
        <div className="left-div">
          <Brand href={"https://ixswap.io/"} logo={<IXSwapLogo />} />
        </div>
        <div className="right-div">
          <UniswapLink
            href="https://app.uniswap.org/#/add/v2/ETH/0x73d7c860998CA3c01Ce8c808F5577d94d545d1b4?chain=mainnet"
            className={"uniswap-logo"}
          />
          <WalletConnectButton
            buttonClassName={"wallet-container"}
            logoClassName={"wallet-logo"}
            onClick={toggleShowOverlay}
            account={account}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
