import {
  AppBar,
  Container,
  MenuItem,
  Select,
  Toolbar,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { useNavigate } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CryptoData } from "../CryptoContext";

const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#fff",
    },
    mode: "dark",
  },
});
const useStyles = makeStyles(() => ({
  mainHeader: {
    "& .MuiTypography-root": {
      flex: 1,
      color: "gold",
      fontFamily: "Montserrat",
      fontWeight: "bold",
      cursor: "pointer",
    },
  },
}));

function Header() {
  const styles = useStyles();
  const navigate = useNavigate();

  const { currency, setCurrency } = CryptoData();
  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color="transparent" position="static">
        <Container>
          <Toolbar className={styles.mainHeader}>
            <Typography variant="h6" onClick={() => navigate("/")}>
              Crypto Hunter
            </Typography>
            <Select
              variant="outlined"
              sx={{
                width: 100,
                heiight: 40,
                marginRight: 15,
              }}
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <MenuItem value="USD">USD</MenuItem>
              <MenuItem value="INR">INR</MenuItem>
            </Select>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}

export default Header;
