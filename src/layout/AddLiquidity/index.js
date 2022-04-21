import "./index.scss";
import TitleHeader from "../../components/Common/TitleHeader";
import TokenConversionContainer from "../../components/AddLiquidity/TokenConversionContainer";
import TokenPerTokenConversion from "../../components/Common/TokenPerTokenConversion";
import ArrowLogo from "../../assets/Main/ArrowLogo";
import { useBalance } from "../../hooks/Contexts/BalanceContext";
import { usePrice } from "../../hooks/Contexts/PriceContext";
import { useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { addLiquidity } from "../../utils/utils";

const AddLiquidity = () => {
  const tokenBalance = useBalance();
  const tokenPrice = usePrice();
  const [ethAmount, setETHAmount] = useState("");
  const [ixsAmount, setIXSAmount] = useState("");
  const [buttonState, setButtonState] = useState();
  const [allowAddLiquidity, setAllowAddLiquidity] = useState(false);
  const { active } = useWeb3React();

  const onValueChange = (token) => (event) => {
    if (token === "ETH") {
      event.preventDefault();
      setETHAmount(event.target.value);
      setIXSAmount(event.target.value * tokenPrice.ixsPerETHPrice);
    }
    if (token === "IXS") {
      event.preventDefault();
      setIXSAmount(event.target.value);
      setETHAmount(event.target.value * tokenPrice.ethPerIXSPrice);
    }
    if (event.target.value === "") {
      setIXSAmount("");
      setETHAmount("");
    }
  };

  const maxAmount = (token) => {
    if (token === "ETH") {
      if (tokenBalance.ethTokenBalance === 0) {
        setETHAmount("");
        setIXSAmount("");
      } else {
        setETHAmount(tokenBalance.ethTokenBalance);
        setIXSAmount(tokenBalance.ethTokenBalance * tokenPrice.ixsPerETHPrice);
      }
    }
    if (token === "IXS") {
      if (tokenBalance.ixsTokenBalance === 0) {
        setIXSAmount("");
        setETHAmount("");
      } else {
        setIXSAmount(tokenBalance.ixsTokenBalance);
        setETHAmount(tokenBalance.ixsTokenBalance * tokenPrice.ethPerIXSPrice);
      }
    }
  };

  useEffect(() => {
    const buttonTextChecker = () => {
      if (!active) {
        setButtonState("Connect Wallet");
        setAllowAddLiquidity(false);
        return;
      }
      if (ethAmount === "") {
        setButtonState("Enter amount");
        setAllowAddLiquidity(false);
      } else if (
        ethAmount !== tokenBalance.ethTokenBalance ||
        ixsAmount !== tokenBalance.ixsTokenBalance
      ) {
        setButtonState("Insufficient Balance");
        setAllowAddLiquidity(false);
      } else {
        setButtonState("Add Liquidity");
        setAllowAddLiquidity(true);
      }
    };
    buttonTextChecker();
  }, [
    active,
    ethAmount,
    ixsAmount,
    tokenBalance.ethTokenBalance,
    tokenBalance.ixsTokenBalance,
  ]);

  return (
    <div className="container liquidity">
      <div className="liquidity-container">
        <TitleHeader
          className={"liquidity-title-header"}
          title={"Add Liquidity"}
        />
        <div className="liquidity-content">
          <TokenConversionContainer
            className="conversion-container"
            token="ETH"
            balance={tokenBalance.ethTokenBalance}
            value={ethAmount}
            onChange={onValueChange("ETH")}
            onClick={() => maxAmount("ETH")}
          />
          <TokenConversionContainer
            className="conversion-container"
            token="IXS"
            balance={tokenBalance.ixsTokenBalance}
            value={ixsAmount}
            onChange={onValueChange("IXS")}
            onClick={() => maxAmount("IXS")}
          />
        </div>
      </div>
      <div className="liquidity-price-feed-container">
        <div className="liquidity-price-feed">
          <div className="first-conversion">
            <TokenPerTokenConversion
              firstToken={"ETH"}
              secondToken={"IXS"}
              price={tokenPrice.ethPerIXSPrice}
            />
          </div>
          <ArrowLogo />
          <div className="second-conversion">
            <TokenPerTokenConversion
              firstToken={"IXS"}
              secondToken={"ETH"}
              price={tokenPrice.ixsPerETHPrice}
            />
          </div>
        </div>
        <div className="liquidity-button-container">
          <button
            onClick={() => addLiquidity(ethAmount, ixsAmount)}
            disabled={allowAddLiquidity}
          >
            {buttonState}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddLiquidity;
