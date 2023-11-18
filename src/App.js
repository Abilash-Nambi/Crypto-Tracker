import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header";
import HomePage from "./Pages/HomePage";
import CoinPage from "./Pages/CoinPage";
import { makeStyles } from "@mui/styles";
import AlertMessage from "./Components/Alert";
import {
  StyledEngineProvider,
  ThemeProvider,
  createTheme,
} from "@mui/material/styles";
import { Paper } from "@mui/material";
import { CryptoData } from "./CryptoContext";
const useStyles = makeStyles(() => ({
  App: {
    //background: "#14161a",
    //color: "white",
    minHeight: "100vh",
  },
}));

function App() {
  const styles = useStyles();
  const { darkTheme } = CryptoData();
  return (
    <ThemeProvider theme={darkTheme}>
      <BrowserRouter>
        <StyledEngineProvider injectFirst>
          <div className={styles.App}>
            <Paper>
              <Header />
              <Routes>
                <Route path="/" element={<HomePage />}></Route>
                <Route path="/coins/:id" element={<CoinPage />}></Route>
              </Routes>
              <AlertMessage />
            </Paper>
          </div>
        </StyledEngineProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
