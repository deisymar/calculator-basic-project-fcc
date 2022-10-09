import Key from "./Key";

const data = [
  { id: "clear", value: "AC" },
  { id: "backspace", value: "C" },
  { id: "divide", value: "/" },
  { id: "seven", value: "7" },
  { id: "eight", value: "8" },
  { id: "nine", value: "9" },
  { id: "multiply", value: "x" },
  { id: "four", value: "4" },
  { id: "five", value: "5" },
  { id: "six", value: "6" },
  { id: "subtract", value: "-" },
  { id: "one", value: "1" },
  { id: "two", value: "2" },
  { id: "three", value: "3" },
  { id: "add", value: "+" },
  { id: "decimal", value: "." },
  { id: "zero", value: "0" },
  { id: "equals", value: "=" }
];

const Keyboard = ({ handleClick }) => {
  return (
    <div className="pad-keyboard">
      {data.map((key) => (
        <Key id={key.id} keyData={key} handleClick={handleClick} />
      ))}
    </div>
  );
};

export default Keyboard;
