import UniswapLogo from "../../assets/Header/UniswapLogo";

const UniswapLink = ({ href, className }) => {
  return (
    <a href={href}>
      <UniswapLogo className={className} />
    </a>
  );
};

export default UniswapLink;
