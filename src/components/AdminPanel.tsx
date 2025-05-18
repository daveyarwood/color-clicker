import { useState, useEffect } from "react";
import "./AdminPanel.css";

interface AdminPanelProps {
  total: number;
  rate: number;
  onUpdateTotal: (newTotal: number) => void;
  onUpdateRate: (newRate: number) => void;
}

export function AdminPanel({ total, rate, onUpdateTotal, onUpdateRate }: AdminPanelProps) {
  // State for total input
  const [totalInputValue, setTotalInputValue] = useState(total.toString());
  const [isTotalEditing, setIsTotalEditing] = useState(false);
  
  // State for rate input
  const [rateInputValue, setRateInputValue] = useState(rate.toString());
  const [isRateEditing, setIsRateEditing] = useState(false);
  
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
          type="text"
          value={totalInputValue}
          onChange={(e) => setTotalInputValue(e.target.value)}
          disabled={!isTotalEditing}
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
          type="text"
          value={rateInputValue}
          onChange={(e) => setRateInputValue(e.target.value)}
          disabled={!isRateEditing}
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