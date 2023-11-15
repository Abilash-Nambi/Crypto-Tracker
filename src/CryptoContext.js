import axios from "axios";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { createContext } from "react";
import { CoinList } from "./Config/api";
import { onAuthStateChanged } from "firebase/auth";
import { Auth } from "./Pages/firebase";

const Crypto = createContext();

function CryptoContext({ children }) {
  const [currency, setCurrency] = useState("INR");
  const [symbol, setSymbol] = useState("₹");
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [alert, setAlert] = useState({
    open: false,
    message: "hai",
    type: "success",
  });
  //console.log(currency);
  console.log(user, "user");
  useEffect(() => {
    onAuthStateChanged(Auth, (user) => {
      if (user) {
        setUser(user);
      } else setUser(null);
    });
  }, []);

  useEffect(() => {
    if (currency === "INR") {
      setSymbol("₹");
    } else if (currency === "USD") {
      setSymbol("$");
    }
  }, [currency]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(CoinList(currency));
      setCoins(response.data);
      console.log(response, "==CoinList ");
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Crypto.Provider
      value={{
        currency,
        symbol,
        setCurrency,
        coins,
        loading,
        fetchData,
        alert,
        setAlert,
        user,
      }}
    >
      {children}
    </Crypto.Provider>
  );
}

export default CryptoContext;

export const CryptoData = () => {
  return useContext(Crypto);
};
