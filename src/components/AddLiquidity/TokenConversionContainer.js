import TokenConversionHeader from "./TokenConversionHeader";
import TokenConversionInput from "./TokenConversionInput";
const TokenConversionContainer = ({
  className,
  token,
  balance,
  value,
  onChange,
  onClick,
}) => {
  return (
    <div className={className}>
      <TokenConversionHeader
        className={"token-conversion-header"}
        token={token}
        balance={balance}
      />
      <TokenConversionInput
        className={"token-converter"}
        value={value}
        onChange={onChange}
        onClick={onClick}
      />
    </div>
  );
};

export default TokenConversionContainer;
