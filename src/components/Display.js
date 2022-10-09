const Display = ({ input, calc }) => (
  <div className="outScreen">
    <span id="formula" className="result">
      {calc.replace(/x/g, "*")}
    </span>
    <span id="display" className="input">
      {input}
    </span>
  </div>
);

export default Display;
