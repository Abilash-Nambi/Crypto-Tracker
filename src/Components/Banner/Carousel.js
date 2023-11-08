import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/material";
import { TrendingCoins } from "../../Config/api";
import { CryptoData } from "../../CryptoContext";
import axios from "axios";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";
import { flushSync } from "react-dom";

const useStyles = makeStyles((theme) => ({
  carousel: {
    height: "50%",
    display: "flex",
    alignItems: "center",
  },
  carouselItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    cursor: "pointer",
    textTransform: "uppercase",
    color: "white",
  },
}));

const Carousel = () => {
  const [trending, setTrending] = useState([]);
  const styles = useStyles();
  const { currency, symbol } = CryptoData();

  useEffect(() => {
    fetchTrendingCoins();
  }, [currency]);

  const fetchTrendingCoins = async () => {
    try {
      const response = await axios.get(TrendingCoins(currency));
      setTrending(response.data);
      console.log(response, "response");
    } catch (err) {
      console.log(err, "this is error");
    }
  };

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const items = trending?.map((data) => {
    let profit = data.price_change_percentage_24h >= 0;
    return (
      <Link to={`/coins/${data.name}`} className={styles.carouselItem}>
        <img
          src={data?.image}
          alt={data.name}
          height="80"
          style={{ marginBottom: 10 }}
        />
        <span>
          {data?.symbol}
          &nbsp;
          <span
            style={{
              color: profit > 0 ? "rgb(14,203,129)" : "red",
            }}
          >
            {profit && "+"}
            {data.price_change_percentage_24h?.toFixed(2)}
          </span>
        </span>
        <span style={{ fontSize: 22, fontWeight: 500 }}>
          {symbol}
          {numberWithCommas(data?.current_price.toFixed(2))}
        </span>
      </Link>
    );
  });

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };

  return (
    <Box className={styles.carousel}>
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableButtonsControls
        disableDotsControls
        responsive={responsive}
        autoPlay
        items={items}
      />
    </Box>
  );
};

export default Carousel;
