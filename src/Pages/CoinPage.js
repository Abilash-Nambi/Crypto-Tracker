import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CryptoData } from "../CryptoContext";
import axios from "axios";
import { SingleCoin } from "../Config/api";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/system";
import { Box, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { LinearProgress } from "@material-ui/core";
import CoinInfo from "../Components/CoinInfo";

const useStyles = makeStyles(() => ({
  description: {
    width: "100%",
    fontFamily: "Montserrat",
    padding: 25,
    paddingBottom: 15,
    paddingTop: 0,
    textAlign: "justify",
  },
  heading: {
    fontWeight: "bold",
    marginBottom: 20,
    fontFamily: "Montserrat",
  },
  marketData: {
    alignSelf: "start",
    padding: 30,
    paddingTop: 10,
    width: "100%",
  },
}));
function CoinPage() {
  const { id } = useParams();
  const [coin, setCoin] = useState();
  const { currency, symbol } = CryptoData();
  const classes = useStyles();
  //const lowercaseId = id.toLowerCase();
  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));
    setCoin(data);
  };

  const CustomGridSidebar = styled(Grid)(({ theme }) => ({
    [theme.breakpoints.down("md")]: {
      alignItems: "center",
      display: "flex",
      flexDirection: "column",
    },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 25,
    borderRight: "2px solid grey",
    height: "100vh",
  }));
  const CustomGridRight = styled(Grid)(({ theme }) => ({
    display: "flex",
    width: "100%",

    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
    },
  }));
  const CustomBox = styled(Box)(({ theme }) => ({
    alignSelf: "start",
    padding: 25,
    paddingTop: 10,
    width: "100%",
    [theme.breakpoints.down("md")]: {
      display: "flex",
      justifyContent: "space-around",
    },
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "center",
    },
    [theme.breakpoints.down("xs")]: {
      alignItems: "start",
    },
  }));

  useEffect(() => {
    fetchCoin();
  }, []);

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  if (!coin)
    return (
      <LinearProgress
        sx={{
          "& .MuiLinearProgress-root": {
            background: "gold",
          },
        }}
      />
    );

  return (
    <>
      <Grid container spacing={2}>
        <CustomGridSidebar item xs={12} md={4} sm={12}>
          <img
            src={coin?.image.large}
            alt={coin?.name}
            height="200"
            style={{ marginBottom: 20 }}
          />
          <Typography variant="h3" className={classes.heading}>
            {coin?.name}
          </Typography>
          <Typography variant="subtitle1" className={classes.description}>
            <div
              dangerouslySetInnerHTML={{
                __html: coin?.description.en.split(". ")[0],
              }}
            />
          </Typography>
          <CustomBox sx={classes.marketData}>
            <span style={{ display: "flex" }}>
              <Typography variant="h5" className={classes.heading}>
                Rank:
              </Typography>
              &nbsp; &nbsp;
              <Typography
                variant="h5"
                style={{
                  fontFamily: "Montserrat",
                }}
              >
                {numberWithCommas(coin?.market_cap_rank)}
              </Typography>
            </span>
            <span style={{ display: "flex" }}>
              <Typography variant="h5" className={classes.heading}>
                Current Price:
              </Typography>
              &nbsp; &nbsp;
              <Typography
                variant="h5"
                style={{
                  fontFamily: "Montserrat",
                }}
              >
                {symbol}{" "}
                {numberWithCommas(
                  coin?.market_data.current_price[currency.toLowerCase()]
                )}
              </Typography>
            </span>
            <span style={{ display: "flex" }}>
              <Typography variant="h5" className={classes.heading}>
                Market Cap:
              </Typography>
              &nbsp; &nbsp;
              <Typography
                variant="h5"
                style={{
                  fontFamily: "Montserrat",
                }}
              >
                {symbol}
                {numberWithCommas(
                  coin?.market_data.market_cap[currency.toLowerCase()]
                    .toString()
                    .slice(0, -6)
                )}
                M
              </Typography>
            </span>
          </CustomBox>
        </CustomGridSidebar>
        <CustomGridRight item xs={12} md={8} sm={12}>
          <CoinInfo coin={coin} />
        </CustomGridRight>
      </Grid>
    </>
  );
}

export default CoinPage;
