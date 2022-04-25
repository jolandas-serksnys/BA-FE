import { useState } from "react";

export const usePriceAnimation = () => {
  const [animation, setAnimation] = useState('initial');

  const changeValue = (newValue: number, setValue: (value: number) => void) => {
    setTimeout(() => setAnimation('goUp'), 0);
    setTimeout(() => setValue(newValue), 100);
    setTimeout(() => setAnimation('waitDown'), 100);
    setTimeout(() => setAnimation('initial'), 200);
  }

  return { changeValue, animation };
}