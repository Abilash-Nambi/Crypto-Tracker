import { Box, Button, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";

const useStyles = makeStyles(() => ({
  Login: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    "& .MuiFormControl-root": {
      marginBottom: "20px",
    },
  },
}));
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const styles = useStyles();

  return (
    <Box className={styles.Login}>
      <TextField
        variant="outlined"
        type="email"
        label="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
      />
      <TextField
        variant="outlined"
        label="Enter Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
      />
      <Button
        variant="contained"
        size="large"
        sx={{ backgroundColor: "#EEBC1D" }}
        //onClick={handleSubmit}
      >
        Sign Up
      </Button>
    </Box>
  );
}

export default Login;
