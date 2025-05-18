import { useState } from "react";
import { renderColorBlocks } from "../hsl";

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
      name: "Shade Enhancer",
      description: "Each click gives +1 more Shade",
      cost: 50,
      unlockAt: 30,
      purchased: false,
    },
    {
      id: "auto-clicker",
      name: "Shade Collector",
      description: "Automatically collects 1 Shade per second",
      cost: 100,
      unlockAt: 60,
      purchased: false,
    },
    {
      id: "wrap",
      name: "Line Wrapping",
      description: "Makes the total display wrap to multiple lines",
      cost: 2500,
      unlockAt: 10800,  // Appears when display becomes annoyingly long (30 blocks)
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
  // and filter out purchased items
  const availableItems = items.filter(
    (item) => total >= item.unlockAt && !item.purchased
  );

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
              <p className="shop-item-cost">Cost: {renderColorBlocks(item.cost)}</p>
            </div>
            <button
              onClick={() => handlePurchase(item)}
              disabled={total < item.cost}
            >
              Buy
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}