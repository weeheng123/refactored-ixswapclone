import TokenPerTokenConversion from "../../Common/TokenPerTokenConversion";

const ConversionToken = ({ className, firstToken, secondToken, price }) => (
  <div className={className}>
    <span className="token">{firstToken}</span>
    <TokenPerTokenConversion
      firstToken={firstToken}
      secondToken={secondToken}
      price={price}
    />
  </div>
);

export default ConversionToken;
