const ConnectionButton = ({ className, logo, wallet, onClick }) => (
  <div className={className} onClick={onClick}>
    {logo}
    <span>{wallet}</span>
  </div>
);

export default ConnectionButton;
