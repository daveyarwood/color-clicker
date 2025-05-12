import { useState } from "react";
import { blockAmounts } from "./hsl";

const colorBlock = (n: number) => (
  <span
    key={crypto.randomUUID()}
    style={{ color: n == 360 ? "hsl(0 0% 0%)" : `hsl(${n} 50% 50%)` }}
  >
    ■
  </span>
);

const totalBlocks = (total: number) =>
  blockAmounts(total).map((n) => colorBlock(n));

const DISPLAY_CORE_MECHANIC_HINT_MIN = 1;
const DISPLAY_CORE_MECHANIC_HINT_MAX = 50;

/**
 * A hint for the core mechanic of the game, displayed at the very beginning and
 * slowly vanishing as the player begins collecting currency.
 **/
const coreMechanicHint = (total: number) => {
  return (
    <span
      key="hint"
      style={{
        opacity: Math.max(0, 1 - total / DISPLAY_CORE_MECHANIC_HINT_MAX),
        transition: "opacity 0.5s ease-in-out",
        fontSize: "0.8em",
        color: "hsl(0 0% 25%)",
      }}
    >
      {" "}
      ({total})
    </span>
  );
};

function App() {
  const [total, setTotal] = useState(0);

  return (
    <div className="game-container">
      <h1>Color Clicker</h1>
      <div className="total-display">
        Total: {totalBlocks(total)}
        {total >= DISPLAY_CORE_MECHANIC_HINT_MIN &&
          total <= DISPLAY_CORE_MECHANIC_HINT_MAX &&
          coreMechanicHint(total)}
      </div>
      <button key="adder-button" onClick={() => setTotal((total) => total + 1)}>
        Click me!
      </button>
    </div>
  );
}

export default App;
