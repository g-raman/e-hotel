import { useState } from "react";
import { Button } from "./button";

const Counter = ({
  min = 1,
  max = 5,
  defaultValue = 1,
  icon,
  onIncrement,
  onDecrement,
}) => {
  const [count, setCount] = useState(defaultValue);
  const decrementEnabled = count === min;
  const incrementEnabled = count === max;

  function handleIncrement() {
    if (count + 1 <= max) {
      setCount((count) => count + 1);
      onIncrement();
    }
  }

  function handleDecrement() {
    if (count - 1 >= min) {
      setCount((count) => count - 1);
      onDecrement();
    }
  }

  return (
    <div className="flex w-full gap-2">
      <Button
        disabled={decrementEnabled}
        onClick={handleDecrement}
        variant="secondary"
        className="h-10"
      >
        -
      </Button>

      <div className="flex w-full items-center justify-center gap-4 rounded-md bg-gray-100 px-4">
        <span>{icon}</span>
        <span>{count}</span>
      </div>

      <Button
        disabled={incrementEnabled}
        onClick={handleIncrement}
        variant="secondary"
        className="h-10"
      >
        +
      </Button>
    </div>
  );
};

export default Counter;
