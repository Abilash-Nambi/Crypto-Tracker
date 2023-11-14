import React from "react";
import Snackbar from "@mui/material/Snackbar";
import { CryptoData } from "../CryptoContext";
import Alert from "@mui/material/Alert";

function AlertMessage() {
  const { alert, setAlert } = CryptoData();
  const handleCloseAlert = () => setAlert(false);
  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: " center" }}
        open={alert.open}
        onClose={handleCloseAlert}
        //message="I love snacks"
        key={"bottom-center-key"}
      >
        <Alert
          severity={alert.type}
          onClose={handleCloseAlert}
          variant="filled"
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default AlertMessage;
