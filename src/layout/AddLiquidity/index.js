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
import { parseEther, formatEther, formatUnits } from "ethers/lib/utils";

const AddLiquidity = () => {
  const tokenBalance = useBalance();
  const tokenPrice = usePrice();
  const [tokenAmounts, setTokenAmounts] = useState({
    ethAmount: parseEther("0"),
    ixsAmount: parseEther("0"),
  });
  const [buttonState, setButtonState] = useState();
  const [inputState, setInputState] = useState(false);
  const [allowAddLiquidity, setAllowAddLiquidity] = useState(false);
  const { active } = useWeb3React();

  const onValueChange = (event) => {
    const name = event.target.name;
    if (name === "ETH") {
      event.preventDefault();
      setTokenAmounts({
        ethAmount: parseEther(event.target.value),
        ixsAmount: parseEther(event.target.value)
          .mul(tokenPrice.ixsPerETHPrice)
          .div(10 ** 15),
      });
    } else {
      event.preventDefault();
      setTokenAmounts({
        ethAmount: parseEther(event.target.value)
          .mul(tokenPrice.ethPerIXSPrice)
          .div(10 ** 15),
        ixsAmount: parseEther(event.target.value),
      });
    }
  };

  const maxAmount = (token) => {
    if (token === "ETH") {
      if (!tokenBalance.ethTokenBalance.isZero()) {
        setTokenAmounts({
          ethAmount: tokenBalance.ethTokenBalance,
          ixsAmount: tokenBalance.ethTokenBalance
            .mul(tokenPrice.ixsPerETHPrice)
            .div(10 ** 15),
        });
      }
    }
    if (token === "IXS") {
      if (!tokenBalance.ixsTokenBalance.isZero()) {
        setTokenAmounts({
          ethAmount: tokenBalance.ixsTokenBalance,
          ixsAmount: tokenBalance.ixsTokenBalance
            .mul(tokenPrice.ethPerIXSPrice)
            .div(10 ** 15),
        });
      }
    }
  };
  useEffect(() => {
    if (tokenAmounts.ethAmount.isZero()) {
      setInputState(false);
    } else {
      setInputState(true);
    }
  }, [tokenAmounts.ethAmount]);

  useEffect(() => {
    const buttonTextChecker = () => {
      if (!active) {
        setButtonState("Connect Wallet");
        setAllowAddLiquidity(true);
        return;
      }
      if (tokenAmounts.ethAmount.isZero()) {
        setButtonState("Enter amount");
        setAllowAddLiquidity(true);
        return;
      } else if (
        tokenAmounts.ethAmount !== tokenBalance.ethTokenBalance ||
        tokenAmounts.ixsAmount !== tokenBalance.ixsTokenBalance
      ) {
        setButtonState("Insufficient Balance");
        setAllowAddLiquidity(true);
        return;
      } else {
        setButtonState("Add Liquidity");
        setAllowAddLiquidity(false);
        return;
      }
    };
    buttonTextChecker();
  }, [
    active,
    tokenBalance.ethTokenBalance,
    tokenBalance.ixsTokenBalance,
    tokenAmounts.ethAmount,
    tokenAmounts.ixsAmount,
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
            balance={formatEther(tokenBalance.ethTokenBalance)}
            value={inputState ? formatEther(tokenAmounts.ethAmount) : ""}
            name="ETH"
            onChange={(e) => onValueChange(e)}
            onClick={() => maxAmount("ETH")}
          />
          <TokenConversionContainer
            className="conversion-container"
            token="IXS"
            balance={formatEther(tokenBalance.ixsTokenBalance)}
            value={inputState ? formatEther(tokenAmounts.ixsAmount) : ""}
            name="IXS"
            onChange={(e) => onValueChange(e)}
            onClick={() => maxAmount("IXS")}
          />
        </div>
      </div>
      <div className="liquidity-price-feed-container">
        <div className="liquidity-price-feed">
          {/* Changing to Number just to display */}
          <div className="first-conversion">
            <TokenPerTokenConversion
              firstToken={"ETH"}
              secondToken={"IXS"}
              price={Number(
                formatUnits(tokenPrice.ethPerIXSPrice, 15)
              ).toPrecision(6)}
            />
          </div>
          <ArrowLogo />
          <div className="second-conversion">
            <TokenPerTokenConversion
              firstToken={"IXS"}
              secondToken={"ETH"}
              price={Number(
                formatUnits(tokenPrice.ixsPerETHPrice, 15)
              ).toPrecision(6)}
            />
          </div>
        </div>
        <div className="liquidity-button-container">
          <button
            onClick={() =>
              addLiquidity(tokenAmounts.ethAmount, tokenAmounts.ixsAmount)
            }
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
