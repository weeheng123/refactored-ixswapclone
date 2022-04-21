const TokenConversionHeader = ({ className, token, balance }) => {
  return (
    <div className={className}>
      <h3>{token}</h3>
      <h4>
        Balance:<span>{balance}</span>
      </h4>
    </div>
  );
};

export default TokenConversionHeader;
