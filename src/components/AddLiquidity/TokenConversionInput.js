const TokenConversionInput = ({
  className,
  value,
  name,
  onChange,
  onClick,
}) => {
  return (
    <div className={className}>
      <input
        type="number"
        placeholder="0.0"
        value={value}
        name={name}
        onChange={onChange}
      />
      <button name={name} onClick={onClick}>
        <span>max</span>
      </button>
    </div>
  );
};

export default TokenConversionInput;
