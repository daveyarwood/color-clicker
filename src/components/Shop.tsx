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
    // Click increment upgrades
    {
      id: "increment",
      name: "Shade Enhancer",
      description: "Each click earns 1 Shade",
      cost: 50,
      unlockAt: 20,
      purchased: false,
    },
    {
      id: "auto-clicker",
      name: "Shade Collector",
      description: "Automatically earn 1 Shade per second",
      cost: 100,
      unlockAt: 40,
      purchased: false,
    },
    {
      id: "increment-5",
      name: "Advanced Shade Enhancer",
      description: "Each click earns 5 Shades",
      cost: 500,
      unlockAt: 100,  // Show much earlier than affordable
      purchased: false,
    },
    {
      id: "auto-clicker-5",
      name: "Advanced Shade Collector",
      description: "Automatically earn 5 Shades per second",
      cost: 1000,
      unlockAt: 150,  // Show earlier to create choice vs. increment-5
      purchased: false,
    },
    {
      id: "increment-10",
      name: "Superior Shade Enhancer",
      description: "Each click earns 10 Shades",
      cost: 2000,
      unlockAt: 500,  // Show earlier to tempt saving
      purchased: false,
    },
    {
      id: "auto-clicker-10",
      name: "Superior Shade Collector",
      description: "Automatically earn 10 Shades per second",
      cost: 5000,
      unlockAt: 1000,  // Show earlier to create decision point
      purchased: false,
    },
    {
      id: "wrap",
      name: "Line Wrapping",
      description: "Makes the total display wrap to multiple lines",
      cost: 2500,
      unlockAt: 1200,  // Show much earlier, but still after the display gets lengthy
      purchased: false,
    },
    {
      id: "increment-50",
      name: "Ultimate Shade Enhancer",
      description: "Each click earns 50 Shades",
      cost: 10000,
      unlockAt: 3000,
      purchased: false,
    },
    {
      id: "auto-clicker-50",
      name: "Ultimate Shade Collector",
      description: "Automatically earn 50 Shades per second",
      cost: 25000,
      unlockAt: 5000,
      purchased: false,
    },
    {
      id: "increment-100",
      name: "Legendary Shade Enhancer",
      description: "Each click earns 100 Shades",
      cost: 50000,
      unlockAt: 10000,
      purchased: false,
    },
  ]);

  // Helper to determine which upgrades should be marked as purchased
  const getItemsTiersToPurchase = (itemId: string): string[] => {
    // Define item tiers for auto-clickers
    const autoClickerTiers = ["auto-clicker", "auto-clicker-5", "auto-clicker-10", "auto-clicker-50"];
    // Define item tiers for click enhancers
    const incrementTiers = ["increment", "increment-5", "increment-10", "increment-50", "increment-100"];
    
    // If item is an auto-clicker, mark all lower tiers as purchased
    if (itemId.startsWith("auto-clicker")) {
      const index = autoClickerTiers.indexOf(itemId);
      if (index > 0) {
        return autoClickerTiers.slice(0, index + 1);
      }
    }
    
    // If item is a click enhancer, mark all lower tiers as purchased
    if (itemId.startsWith("increment")) {
      const index = incrementTiers.indexOf(itemId);
      if (index > 0) {
        return incrementTiers.slice(0, index + 1);
      }
    }
    
    // Default: just mark this item as purchased
    return [itemId];
  };

  const handlePurchase = (item: ShopItem) => {
    if (total >= item.cost && !item.purchased) {
      onPurchase(item.id, item.cost);
      
      // Get all tier items that should be marked as purchased
      const tiersToPurchase = getItemsTiersToPurchase(item.id);
      
      // Mark all relevant tiers as purchased
      setItems(
        items.map((i) => tiersToPurchase.includes(i.id) ? { ...i, purchased: true } : i)
      );
    }
  };

  // Only display items that should be unlocked based on the player's progress
  // and filter out purchased items
  const availableItems = items.filter(
    (item) => total >= item.unlockAt && !item.purchased
  );

  // Always render the shop container, even when empty
  // This ensures layout consistency and prevents the button from moving
  if (availableItems.length === 0) {
    return <div className="shop"></div>;
  }

  return (
    <div className="shop">
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