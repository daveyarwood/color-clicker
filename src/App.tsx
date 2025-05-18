import { useState, useEffect } from "react";
import { renderColorBlocks } from "./hsl";
import { Shop } from "./components/Shop";
import { AdminPanel } from "./components/AdminPanel";
import "./components/Shop.css";
import "./components/AdminPanel.css";
import "./App.css";

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
  const [autoClickRate, setAutoClickRate] = useState(0);
  const [shouldShowHint, setShouldShowHint] = useState(true);
  const [lineWrappingEnabled, setLineWrappingEnabled] = useState(false);

  const handleClick = () => {
    setTotal((prev) => prev + clickIncrement);
  };

  const handlePurchase = (itemId: string, cost: number) => {
    setTotal((prev) => prev - cost);

    switch (itemId) {
      // Click increment upgrades - each sets a specific value
      case "increment-2":
        setClickIncrement(2);
        break;
      case "increment-5":
        setClickIncrement(5);
        break;
      case "increment-10":
        setClickIncrement(10);
        break;
      case "increment-50":
        setClickIncrement(50);
        break;
      case "increment-100":
        setClickIncrement(100);
        break;

      // Auto-click upgrades - each sets a specific value
      case "auto-clicker":
        setAutoClickRate(1);
        break;
      case "auto-clicker-5":
        setAutoClickRate(5);
        break;
      case "auto-clicker-10":
        setAutoClickRate(10);
        break;
      case "auto-clicker-50":
        setAutoClickRate(50);
        break;

      // Utility upgrades
      case "wrap":
        setLineWrappingEnabled(true);
        break;
      // Add other item effects here
    }
  };

  // Set up auto-clicker effect
  useEffect(() => {
    if (autoClickRate > 0) {
      // Choose a reasonable number of updates per second based on the rate
      // Higher rates get more frequent updates for smoother visualization
      let updatesPerSecond: number;
      
      if (autoClickRate === 1) {
        updatesPerSecond = 1; // Just update once per second for rate of 1
      } else if (autoClickRate <= 10) {
        updatesPerSecond = 5; // Update 5 times per second for rates 2-10
      } else {
        updatesPerSecond = 10; // Update 10 times per second for rates > 10
      }
      
      // We need to make sure each update adds a whole number to avoid
      // floating point issues over time
      
      // If the rate is exactly divisible by our updates per second, great!
      // Otherwise, we'll calculate how many whole increments to add each update,
      // and handle the remainder by occasionally adding an extra increment
      
      const incrementPerInterval = Math.floor(autoClickRate / updatesPerSecond);
      const remainder = autoClickRate % updatesPerSecond;
      const intervalMs = 1000 / updatesPerSecond;
      
      let updateCounter = 0;
      
      const interval = setInterval(() => {
        updateCounter = (updateCounter + 1) % updatesPerSecond;
        
        // Add the base increment amount plus an extra 1 if needed to handle the remainder
        const extraIncrement = updateCounter < remainder ? 1 : 0;
        setTotal((prev) => prev + incrementPerInterval + extraIncrement);
      }, intervalMs);
      
      return () => clearInterval(interval);
    }
  }, [autoClickRate]);

  // Check if we should hide the hint permanently
  useEffect(() => {
    if (total > DISPLAY_CORE_MECHANIC_HINT_MAX && shouldShowHint) {
      setShouldShowHint(false);
    }
  }, [total, shouldShowHint]);

  return (
    <div className="game-container">
      <h1>Color Clicker</h1>

      <div className="game-layout">
        <div className="game-main">
          <div className="total-display">
            Total:{" "}
            <span className={lineWrappingEnabled ? "wrapped-blocks" : ""}>
              {renderColorBlocks(total)}
            </span>
            {shouldShowHint && total >= 1 && coreMechanicHint(total)}
            {autoClickRate > 0 && (
              <span className="rate-display">
                {" "}
                (Earning {renderColorBlocks(autoClickRate)}/sec)
              </span>
            )}
          </div>
          <button className="adder-button" onClick={handleClick}>
            +{clickIncrement} {clickIncrement === 1 ? "Shade" : "Shades"}
          </button>
        </div>

        <Shop total={total} onPurchase={handlePurchase} />
      </div>

      <AdminPanel
        total={total}
        rate={autoClickRate}
        onUpdateTotal={(newTotal) => setTotal(newTotal)}
        onUpdateRate={(newRate) => setAutoClickRate(newRate)}
      />
    </div>
  );
}

export default App;
