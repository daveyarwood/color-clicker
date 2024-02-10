import { useState } from "react";
import { blockAmounts } from "./hsl";
import "./App.css";

const colorBlock = (n: number) => {
  if (n == 360) {
    return <span style={{ color: `hsl(0 0% 0%)` }}>■</span>;
  }

  return <span style={{ color: `hsl(${n} 50% 50%)` }}>■</span>;
};

const totalBlocks = (total: number) =>
  blockAmounts(total).map((n) => colorBlock(n));

function App() {
  const [total, setTotal] = useState(0);

  const adderButton = (n: number) => (
    <button onClick={() => setTotal((total) => total + n)}>Add {n}</button>
  );

  return (
    <>
      <h1>Color Clicker</h1>
      <div>
        <div>Total: {totalBlocks(total)}</div>
        {adderButton(1)}
        {adderButton(10)}
        {adderButton(100)}
        {adderButton(1000)}
        {adderButton(10000)}
        {adderButton(100000)}
      </div>
    </>
  );
}

export default App;
