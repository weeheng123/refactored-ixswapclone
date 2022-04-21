const TokenConversionInput = ({ className, value, onChange, onClick }) => {
  return (
    <div className={className}>
      <input type="tel" placeholder="0.0" value={value} onChange={onChange} />
      <button onClick={onClick}>
        <span>max</span>
      </button>
    </div>
  );
};

export default TokenConversionInput;
