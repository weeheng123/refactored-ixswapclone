const Brand = ({ href, logo }) => {
  return (
    <a href={href} target="_blank" rel="noreferrer">
      {logo}
    </a>
  );
};

export default Brand;
