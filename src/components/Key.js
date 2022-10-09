const Key = ({ keyData: { id, value }, handleClick }) => {
  return (
    <button id={id} className="pad-button" onClick={() => handleClick(value)}>
      {value}
    </button>
  );
};

export default Key;
