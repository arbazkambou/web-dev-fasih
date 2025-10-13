import { useState } from "react";

function Counter() {
  const [value, setValue] = useState(0);
  return (
    <div>
      {value}
      <div>
        <button onClick={() => setValue(value + 1)}>Inc Value</button>
      </div>
    </div>
  );
}

export default Counter;
