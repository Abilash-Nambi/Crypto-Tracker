import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header";
import HomePage from "./Pages/HomePage";
import CoinPage from "./Pages/CoinPage";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  App: {
    background: "#14161a",
    color: "white",
    minHeight: "100vh",
  },
}));
function App() {
  const styles = useStyles();
  return (
    <BrowserRouter>
      <div className={styles.App}>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/coins/:id" element={<CoinPage />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
