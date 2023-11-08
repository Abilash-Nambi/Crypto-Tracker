import { makeStyles } from "@mui/styles";
import React from "react";
import bannerImg from "../../images/newBanner.jpg";
import { Box, Container, Typography } from "@mui/material";
import Carousel from "./Carousel";

const useStyles = makeStyles(() => ({
  banner: {
    background: `url(${bannerImg}) no-repeat `,
    backgroundSize: "cover",
    height: 400,

    "& .MuiContainer-root": {
      display: "flex",
      flexDirection: "column",
      paddingTop: 25,
      justifyContent: "space-around",
      height: "40%",
    },
  },
  bannerContent: {
    display: "flex",
    flexDirection: "column",

    justifyContent: "center",
    textAlign: "center",

    "& .MuiTypography-h2": {
      fontWeight: "bold",
      marginBottom: 15,
      fontFamily: "Montserrat",
    },

    "& .MuiTypography-subtitile2": {
      color: "darkgray",
      textTransform: "capitalize",
      fontFamily: "Montserrat",
    },
  },
}));

function Banner() {
  const styles = useStyles();
  return (
    <Box className={styles.banner}>
      <Container>
        <Box className={styles.bannerContent}>
          <Typography variant="h2">Crypto Hunter</Typography>
          <Typography variant="subtitile2">
            Get all the Info regarding your favorite Crypto currency..
          </Typography>
        </Box>
      </Container>
      <Carousel />
    </Box>
  );
}

export default Banner;
