import "./index.scss";
import MainHeaderETH from "../../components/Main/Header/MainHeaderETH";
import ConversionContainer from "../../components/Main/Conversion/ConversionContainer";
import DataFeedContainer from "../../components/Main/Conversion/DataFeedContainer";
import AddLiquidityButton from "../../components/Common/AddLiquidityButton";
import { Link } from "react-router-dom";

const Main = () => {
  return (
    <div className="container main">
      <section className="lp-interface">
        <MainHeaderETH className="main-header" />
        <div className="info-panel">
          <ConversionContainer className="conversion-container" />
          <DataFeedContainer className="price-feed-container" />
        </div>
        <Link to={"/add/liquidity"}>
          <AddLiquidityButton className="add-liquidity-button" />
        </Link>
      </section>
    </div>
  );
};

export default Main;
