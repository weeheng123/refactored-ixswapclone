import ConversionToken from "./ConversionToken";
import ArrowLogo from "../../../assets/Main/ArrowLogo";
import { usePrice } from "../../../hooks/Contexts/PriceContext";

const ConversionContainer = ({ className }) => {
  const price = usePrice();

  return (
    <div className={className}>
      <ConversionToken
        className="first-token"
        firstToken={"ETH"}
        secondToken={"IXS"}
        price={price.ethPerIXSPrice}
      />
      <ArrowLogo className="logo-arrow" />
      <ConversionToken
        className="second-token"
        firstToken={"IXS"}
        secondToken={"ETH"}
        price={price.ixsPerETHPrice}
      />
    </div>
  );
};

export default ConversionContainer;
