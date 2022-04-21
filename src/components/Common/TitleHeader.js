import CrossLogo from "../../assets/Header/Overlay/CrossLogo";
import { Link } from "react-router-dom";

const TitleHeader = ({ className, title, onClick }) => {
  return (
    <div className={className}>
      <h1>{title}</h1>
      {onClick ? (
        <CrossLogo className={"cross-logo"} onClick={onClick} />
      ) : (
        <Link to={"/"}>
          <CrossLogo className={"cross-logo"} />
        </Link>
      )}
    </div>
  );
};

export default TitleHeader;
