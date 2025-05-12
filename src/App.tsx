import { useState, useEffect } from "react";
import { renderColorBlocks } from "./hsl";
import { Shop } from "./components/Shop";
import "./components/Shop.css";

const DISPLAY_CORE_MECHANIC_HINT_MAX = 50; // When to stop showing the hint

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
  const [clickIncrement, setClickIncrement] = useState(1);
  const [autoClickerActive, setAutoClickerActive] = useState(false);
  const [shouldShowHint, setShouldShowHint] = useState(true);

  const handleClick = () => {
    setTotal((prev) => prev + clickIncrement);
  };

  const handlePurchase = (itemId: string, cost: number) => {
    setTotal((prev) => prev - cost);

    switch (itemId) {
      case "increment":
        setClickIncrement((prev) => prev + 1);
        break;
      case "auto-clicker":
        setAutoClickerActive(true);
        break;
      // Add other item effects here
    }
  };

  // Set up auto-clicker effect
  useEffect(() => {
    if (autoClickerActive) {
      const interval = setInterval(() => {
        setTotal((prev) => prev + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [autoClickerActive]);

  // Check if we should hide the hint permanently
  useEffect(() => {
    if (total > DISPLAY_CORE_MECHANIC_HINT_MAX && shouldShowHint) {
      setShouldShowHint(false);
    }
  }, [total, shouldShowHint]);

  return (
    <div className="game-container">
      <h1>Color Clicker</h1>
      <div className="total-display">
        Total: {renderColorBlocks(total)}
        {shouldShowHint && total >= 1 && coreMechanicHint(total)}
      </div>
      <button key="adder-button" onClick={handleClick}>
        +{clickIncrement} {clickIncrement === 1 ? "Shade" : "Shades"}
      </button>

      <Shop total={total} onPurchase={handlePurchase} />
    </div>
  );
}

export default App;
