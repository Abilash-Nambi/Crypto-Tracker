import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { createContext } from "react";

const Crypto = createContext();

function CryptoContext({ children }) {
  const [currency, setCurrency] = useState("INR");
  const [symbol, setSymbol] = useState("₹");
  console.log(currency);
  useEffect(() => {
    if (currency === "INR") {
      setSymbol("₹");
    } else if (currency === "USD") {
      setSymbol("$");
    }
  }, [currency]);

  return (
    <Crypto.Provider value={{ currency, symbol, setCurrency }}>
      {children}
    </Crypto.Provider>
  );
}

export default CryptoContext;

export const CryptoData = () => {
  return useContext(Crypto);
};
