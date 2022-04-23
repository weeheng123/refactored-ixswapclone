import UniswapLogo from "../../assets/Header/UniswapLogo";

const UniswapLink = ({ href, className }) => {
  return (
    <a href={href} target="_blank" rel="noreferrer">
      <UniswapLogo className={className} />
    </a>
  );
};

export default UniswapLink;
