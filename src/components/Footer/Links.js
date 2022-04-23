import Socmed from "../../config/constants/Socmed";

const Links = ({ className }) => (
  <div className={className}>
    {Socmed.map((object, index) => (
      <a
        className="footer-logo"
        key={index}
        href={object.hyperlink}
        target="_blank"
        rel="noreferrer"
      >
        {object.icon}
      </a>
    ))}
  </div>
);

export default Links;
