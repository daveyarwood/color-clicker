import { useState, useEffect, useRef } from "react";
import "./AdminPanel.css";

interface AdminPanelProps {
  total: number;
  rate: number;
  onUpdateTotal: (newTotal: number) => void;
  onUpdateRate: (newRate: number) => void;
}

export function AdminPanel({
  total,
  rate,
  onUpdateTotal,
  onUpdateRate,
}: AdminPanelProps) {
  // State for total input
  const [totalInputValue, setTotalInputValue] = useState(total.toString());
  const [isTotalEditing, setIsTotalEditing] = useState(false);
  const totalInputRef = useRef<HTMLInputElement>(null);

  // State for rate input
  const [rateInputValue, setRateInputValue] = useState(rate.toString());
  const [isRateEditing, setIsRateEditing] = useState(false);
  const rateInputRef = useRef<HTMLInputElement>(null);

  // Update input values when props change (only when not editing)
  useEffect(() => {
    if (!isTotalEditing) {
      setTotalInputValue(total.toString());
    }
  }, [total, isTotalEditing]);

  useEffect(() => {
    if (!isRateEditing) {
      setRateInputValue(rate.toString());
    }
  }, [rate, isRateEditing]);

  // Handle total change
  const handleTotalEdit = () => {
    setIsTotalEditing(true);
    // Focus the input after the state update
    setTimeout(() => {
      if (totalInputRef.current) {
        totalInputRef.current.focus();
      }
    }, 0);
  };

  const handleTotalSave = () => {
    const newTotal = parseInt(totalInputValue);
    if (!isNaN(newTotal)) {
      onUpdateTotal(newTotal);
    } else {
      // Reset to current value if invalid input
      setTotalInputValue(total.toString());
    }
    setIsTotalEditing(false);
  };

  // Handle rate change
  const handleRateEdit = () => {
    setIsRateEditing(true);
    // Focus the input after the state update
    setTimeout(() => {
      if (rateInputRef.current) {
        rateInputRef.current.focus();
      }
    }, 0);
  };

  const handleRateSave = () => {
    const newRate = parseInt(rateInputValue);
    if (!isNaN(newRate)) {
      onUpdateRate(newRate);
    } else {
      // Reset to current value if invalid input
      setRateInputValue(rate.toString());
    }
    setIsRateEditing(false);
  };

  return (
    <div className="admin-panel">
      <h3>Admin Panel</h3>
      <div className="admin-control">
        <label>Total:</label>
        <input
          ref={totalInputRef}
          type="text"
          value={totalInputValue}
          onChange={(e) => setTotalInputValue(e.target.value)}
          disabled={!isTotalEditing}
          onKeyDown={(e) => {
            if (e.key === "Enter" && isTotalEditing) {
              handleTotalSave();
            }
          }}
        />
        {isTotalEditing ? (
          <button onClick={handleTotalSave}>Save</button>
        ) : (
          <button onClick={handleTotalEdit}>Edit</button>
        )}
      </div>

      <div className="admin-control">
        <label>Rate:</label>
        <input
          ref={rateInputRef}
          type="text"
          value={rateInputValue}
          onChange={(e) => setRateInputValue(e.target.value)}
          disabled={!isRateEditing}
          onKeyDown={(e) => {
            if (e.key === "Enter" && isRateEditing) {
              handleRateSave();
            }
          }}
        />
        {isRateEditing ? (
          <button onClick={handleRateSave}>Save</button>
        ) : (
          <button onClick={handleRateEdit}>Edit</button>
        )}
      </div>
    </div>
  );
}
