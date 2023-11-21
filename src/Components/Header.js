import {
  AppBar,
  Box,
  Container,
  MenuItem,
  Select,
  Switch,
  Toolbar,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CryptoData } from "../CryptoContext";

import AuthModal from "./Auth/AuthModal";
import UserSideBar from "./Auth/UserSideBar";

const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#fff",
    },
    mode: "dark",
  },
});
const useStyles = makeStyles((theme) => ({
  mainHeader: {
    "& .MuiTypography-root": {
      flex: 1,
      color: "gold",
      fontFamily: "Montserrat",
      fontWeight: "bold",
      cursor: "pointer",
    },
  },
  title: {
    [theme.breakpoints.down("md")]: {
      fontSize: "12px", // Adjust the font size as needed
    },
  },
  title2: {
    [theme.breakpoints.down("md")]: {
      display: "none", // Adjust the font size as needed
    },
  },
}));

function Header() {
  const [checked, setChecked] = useState(true);
  const styles = useStyles();
  const navigate = useNavigate();

  const { currency, setCurrency, user, setTheme } = CryptoData();

  const handleChange = (event) => {
    setChecked(event.target.checked);
    if (checked) {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };
  return (
    //<ThemeProvider theme={darkTheme}>
    <AppBar color="transparent" position="static">
      <Container maxWidth="xl">
        <Toolbar className={styles.mainHeader}>
          <Typography
            className={styles.title}
            variant="h6"
            onClick={() => navigate("/")}
            pt={1}
          >
            Crypto Tracker
          </Typography>
          <Box display={"flex"} alignItems="center">
            <Typography className={styles.title2}>
              {checked ? " Dark Mode" : "Light Mode"}{" "}
            </Typography>
            <Switch
              checked={checked}
              onChange={handleChange}
              inputProps={{ "aria-label": "controlled" }}
              color="warning"
            />
          </Box>
          <Select
            variant="outlined"
            sx={{
              width: 100,
              heiight: 40,
            }}
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <MenuItem value="USD">USD</MenuItem>
            <MenuItem value="INR">INR</MenuItem>
          </Select>
          <Box> {user ? <UserSideBar /> : <AuthModal />}</Box>
        </Toolbar>
      </Container>
    </AppBar>
    // </ThemeProvider>
  );
}

export default Header;
