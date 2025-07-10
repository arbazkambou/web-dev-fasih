import { useState } from "react";
import Button from "./components/Button";

function App() {
  const [steps, setSteps] = useState(1);
  // const [errorMessage, setErrorMessage] = useState("");
  const [show, setShow] = useState(true);

  const messages = [
    "Learn React ⚛️",
    "Apply for jobs 💼",
    "Invest your new income 🤑",
  ];

  function handleNext() {
    if (steps === 3) {
      // setErrorMessage("We have only three steps");
      return;
    }
    setSteps((steps) => steps + 1);
    setSteps((steps) => steps + 1);
    // steps = steps + 1;
  }

  function handlePrev() {
    if (steps === 1) return;
    setSteps(steps - 1);
    // steps = steps + 1;
  }

  function handleToggle() {
    setShow((show) => !show);
  }

  return (
    <>
      {/* <button className="close" onClick={() => setShow((show) => !show)}>
        {show ? "-" : "+"}
      </button> */}

      <Button
        onClick={handleToggle}
        text={show ? "Close" : "Show"}
        className={"close"}
      />

      {show && (
        <div className="steps">
          <div className="numbers">
            <div className={`step-1 ${steps >= 1 ? "active" : ""}`}>1</div>
            <div className={`step-2 ${steps >= 2 ? "active" : ""}`}>2</div>
            <div className={`step-3 ${steps >= 3 ? "active" : ""}`}>3</div>
          </div>

          <p className="message">{messages[steps - 1]}</p>
          {/* {errorMessage && <p>{errorMessage}</p>} */}

          <div className="buttons">
            <Button
              onClick={handlePrev}
              text={"Previous"}
              className={"previous"}
            />
            <Button onClick={handleNext} text={"Next"} className={"next"} />
          </div>
        </div>
      )}
    </>
  );
}

export default App;
