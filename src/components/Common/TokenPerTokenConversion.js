const TokenPerTokenConversion = ({ firstToken, secondToken, price }) => (
  <>
    <span className="token-per-token">
      {firstToken} per {secondToken}
    </span>
    <span className="conversion-number">{price}</span>
  </>
);

export default TokenPerTokenConversion;
