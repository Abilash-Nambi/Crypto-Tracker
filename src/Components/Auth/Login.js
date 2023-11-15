import { Box, Button, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Auth } from "../../Pages/firebase";
import { CryptoData } from "../../CryptoContext";

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
function Login({ handleClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const styles = useStyles();
  const { setAlert } = CryptoData();

  const handleSubmit = async () => {
    if (!email || !password) {
      setAlert({
        open: true,
        message: "Please fill all the Fields",
        type: "error",
      });
    }
    try {
      const response = await signInWithEmailAndPassword(Auth, email, password);
      console.log(response, "thi is response");
      setAlert({
        open: true,
        message: `Sign Up Successful. Welcome ${response.user.email}`,
        type: "success",
      });
      handleClose();
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
    }
  };

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
        onClick={handleSubmit}
      >
        Log in
      </Button>
    </Box>
  );
}

export default Login;
