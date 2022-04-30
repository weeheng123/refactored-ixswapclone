const TokenConversionInput = ({
  className,
  value,
  name,
  onChange,
  onClick,
}) => {
  const handleChange = (event) => {
    const { value } = event.target;
    if (
      value !== "." &&
      +value < Number.MAX_SAFE_INTEGER &&
      value.match("^[0-9]*[.]?[0-9]*$")
    ) {
      onChange(event);
    }
  };

  return (
    <div className={className}>
      <input
        type="text"
        placeholder="0.0"
        pattern="^[0-9]*[.,]?[0-9]*$"
        inputMode="decimal"
        value={value}
        name={name}
        onChange={handleChange}
      />
      <button name={name} onClick={onClick}>
        <span>max</span>
      </button>
    </div>
  );
};

export default TokenConversionInput;
