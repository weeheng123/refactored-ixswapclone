import "./index.scss";
import Copyright from "../../components/Footer/Copyright";
import Links from "../../components/Footer/Links";

const Footer = () => (
  <div className="container">
    <footer>
      <Copyright year="2020-2021" token="IXSwap" />
      <Links />
    </footer>
  </div>
);

export default Footer;
