const Copyright = ({ year, token }) => (
  <div className="ixs-copyright">
    <span>
      © {year} <span className="copyright-token">{token}</span>. All rights
      reserved.
      <br /> Powered by <span className="underline">FacultyGroup</span>
    </span>
  </div>
);

export default Copyright;
