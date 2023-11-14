import { Box } from "@material-ui/core";
import { Button, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import { CryptoData } from "../../CryptoContext";
import { Auth } from "../../Pages/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

const useStyles = makeStyles(() => ({
  SignUp: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    "& .MuiFormControl-root": {
      marginBottom: "20px",
    },
  },
}));

function SignUp({ handleClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const styles = useStyles();
  const { setAlert } = CryptoData();

  const handleSubmit = async () => {
    if (password != confirmPassword) {
      setAlert({
        open: true,
        message: "Passwords do not match",
        type: "error",
      });
      return;
    }
    try {
      const result = await createUserWithEmailAndPassword(
        Auth,
        email,
        password
      );
      console.log("this is reslt", result);
      setAlert({
        open: true,
        message: `Sign Up Successful. Welcome ${result.user.email}`,
        type: "success",
      });
      handleClose();
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
      return;
    }
  };
  return (
    <div>
      <Box className={styles.SignUp}>
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
        <TextField
          variant="outlined"
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          fullWidth
        />
        <Button
          variant="contained"
          size="large"
          sx={{ backgroundColor: "#EEBC1D" }}
          onClick={handleSubmit}
        >
          Sign Up
        </Button>
      </Box>
    </div>
  );
}

export default SignUp;
