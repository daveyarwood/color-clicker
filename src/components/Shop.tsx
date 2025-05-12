import { useState } from "react";

export interface ShopItem {
  id: string;
  name: string;
  description: string;
  cost: number;
  unlockAt: number;
  purchased: boolean;
}

interface ShopProps {
  total: number;
  onPurchase: (itemId: string, cost: number) => void;
}

export function Shop({ total, onPurchase }: ShopProps) {
  // This will be expanded with real items later
  const [items, setItems] = useState<ShopItem[]>([
    {
      id: "increment",
      name: "Bigger Increment",
      description: "Click value +1",
      cost: 50,
      unlockAt: 30,
      purchased: false,
    },
    {
      id: "auto-clicker",
      name: "Auto Clicker",
      description: "Clicks for you once per second",
      cost: 100,
      unlockAt: 60,
      purchased: false,
    },
    {
      id: "wrap",
      name: "Line Wrapping",
      description: "Makes the display wrap to multiple lines",
      cost: 150,
      unlockAt: 100,
      purchased: false,
    },
  ]);

  const handlePurchase = (item: ShopItem) => {
    if (total >= item.cost && !item.purchased) {
      onPurchase(item.id, item.cost);
      setItems(
        items.map((i) => (i.id === item.id ? { ...i, purchased: true } : i))
      );
    }
  };

  // Only display items that should be unlocked based on the player's progress
  const availableItems = items.filter((item) => total >= item.unlockAt);

  if (availableItems.length === 0) {
    return null;
  }

  return (
    <div className="shop">
      <h2>Shop</h2>
      <div className="shop-items">
        {availableItems.map((item) => (
          <div key={item.id} className="shop-item">
            <div className="shop-item-info">
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <p className="shop-item-cost">Cost: {item.cost}</p>
            </div>
            <button
              onClick={() => handlePurchase(item)}
              disabled={total < item.cost || item.purchased}
            >
              {item.purchased ? "Purchased" : "Buy"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}