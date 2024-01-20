import { useState } from "react";
import { toHex, toColorHex, blockAmounts } from "./hex";
import "./App.css";

const colorBlock = (n: number) => {
  return <span style={{ color: `#${toColorHex(n)}` }}>■</span>;
};

const totalBlocks = (total: number) =>
  blockAmounts(total).map((n) => colorBlock(n));

function App() {
  const [total, setTotal] = useState(0);

  const adderButton = (n: number) => (
    <button onClick={() => setTotal((total) => total + n)}>
      Add {toHex(n)}
    </button>
  );

  return (
    <>
      <h1>Color Clicker</h1>
      <div>
        <div>Total: {totalBlocks(total)}</div>
        {adderButton(0x1)}
        {adderButton(0x10)}
        {adderButton(0x100)}
        {adderButton(0x1000)}
        {adderButton(0x10000)}
        {adderButton(0x100000)}
      </div>
    </>
  );
}

export default App;
