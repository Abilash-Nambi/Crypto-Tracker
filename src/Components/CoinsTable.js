import axios from "axios";
import React, { useEffect, useState } from "react";
import { CoinList } from "../Config/api";
import { CryptoData } from "../CryptoContext";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import {
  Box,
  Container,
  LinearProgress,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/system";

const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#fff",
    },
    mode: "dark",
  },
});

const useStyles = makeStyles((theme) => ({
  coinTable: {
    textAlign: "center",
    "& .MuiTypography-h4": {
      fontFamily: "Montserrat",
      margin: 18,
    },
    "& .MuiTextField-root": {
      marginBottom: 20,
      width: "100%",
    },
    "& .MuiLinearProgress-root": {
      background: "gold",
    },
    "& .MuiTableHead-root": {
      background: "#EEBC1D",
    },

    "& .MuiPaginationItem-root": {
      color: "gold",
    },
  },
  row: {
    backgroundColor: "#16171a",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#131111",
    },
    fontFamily: "Montserrat",
  },
}));

const CustomPagination = styled(Pagination)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    padding: 1, // Adjust the padding for small screens
  },
}));

function CoinsTable() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const { currency, symbol } = CryptoData();
  const [page, setPage] = useState(1);

  const styles = useStyles();
  const navigate = useNavigate();
  useEffect(() => {
    fetchData();
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

  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(search.toLowerCase())
    );
  };
  console.log(handleSearch, "han");
  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  return (
    <ThemeProvider theme={darkTheme}>
      <Container className={styles.coinTable}>
        <Typography variant="h4">
          Cryptocurrency Prices by Market Cap
        </Typography>
        <TextField
          variant="outlined"
          label="Search For a Crpto Currency ..."
          onChange={(e) => setSearch(e.target.value)}
        />

        <TableContainer>
          {loading ? (
            <LinearProgress />
          ) : (
            <Table>
              <TableHead>
                <TableRow>
                  {["Coin", "Price", "24h Change", "Market Cap"].map((data) => (
                    <TableCell
                      key={data}
                      align={data === "Coin" ? "" : "right"}
                      sx={{
                        color: "black",
                        fontWeight: "700",
                        fontFamily: "Monstserrat",
                      }}
                    >
                      {data}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {handleSearch()
                  .slice((page - 1) * 10, (page - 1) * 10 + 10)
                  .map((data) => {
                    const profit = data.price_change_percentage_24h >= 0;

                    return (
                      <TableRow
                        key={data.name}
                        onClick={() => navigate(`/coins/${data.id}`)}
                        className={styles.row}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          sx={{ display: "flex", gap: 4 }}
                        >
                          <img
                            src={data?.image}
                            alt={data.name}
                            height="50"
                            style={{ marginBottom: 10 }}
                          />
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              color: "white",
                            }}
                          >
                            <span
                              style={{
                                textTransform: "uppercase",
                                fontSize: 22,
                              }}
                            >
                              {data.symbol}
                            </span>
                            <span style={{ color: "darkgrey" }}>
                              {data.name}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell align="right">
                          {symbol}{" "}
                          {numberWithCommas(data.current_price.toFixed(2))}
                        </TableCell>
                        <TableCell
                          align="right"
                          sx={{
                            color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                            fontWeight: 500,
                          }}
                        >
                          {profit && "+"}
                          {data.price_change_percentage_24h.toFixed(2)}%
                        </TableCell>
                        <TableCell align="right">
                          {symbol}{" "}
                          {numberWithCommas(
                            data.market_cap.toString().slice(0, -6)
                          )}
                          M
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          )}
        </TableContainer>
        <CustomPagination
          count={(handleSearch()?.length / 10).toFixed(0)}
          sx={{
            padding: 20,
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
          onChange={(_, value) => {
            setPage(value);
            window.scroll(0, 450);
          }}
        />
      </Container>
    </ThemeProvider>
  );
}

export default CoinsTable;
