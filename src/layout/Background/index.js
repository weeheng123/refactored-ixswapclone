import "./Background.scss";
import { ReactComponent as Background1 } from "../../assets/Background/background1.svg";
import { ReactComponent as Background2 } from "../../assets/Background/background2.svg";
import { ReactComponent as Background3 } from "../../assets/Background/background3.svg";
import { ReactComponent as Background4 } from "../../assets/Background/background4.svg";
import { ReactComponent as Background6 } from "../../assets/Background/background6.svg";
import { ReactComponent as Background7 } from "../../assets/Background/background7.svg";

const Background = () => {
  return (
    <div className="app-background">
      <Background1 id="fluid" />
      <Background2 id="small-meteor-top" />
      <Background3 id="meteor-big" />
      <Background4 id="meteor-small" />
      <Background6 id="red-meteor" />
      <Background7 id="shooting-star" />
    </div>
  );
};

export default Background;
