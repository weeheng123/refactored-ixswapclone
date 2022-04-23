import ConversionToken from "./ConversionToken";
import ArrowLogo from "../../../assets/Main/ArrowLogo";
import { usePrice } from "../../../hooks/Contexts/PriceContext";
import { formatUnits } from "ethers/lib/utils";

const ConversionContainer = ({ className }) => {
  const price = usePrice();

  return (
    <div className={className}>
      <ConversionToken
        className="first-token"
        firstToken={"ETH"}
        secondToken={"IXS"}
        price={Number(formatUnits(price.ethPerIXSPrice, 15)).toPrecision(6)}
      />
      <ArrowLogo className="logo-arrow" />
      <ConversionToken
        className="second-token"
        firstToken={"IXS"}
        secondToken={"ETH"}
        price={Number(formatUnits(price.ixsPerETHPrice, 15)).toFixed(6)}
      />
    </div>
  );
};

export default ConversionContainer;
