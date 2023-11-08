import React, { useEffect, useState } from "react";
import { HistoricalChart } from "../Config/api";
import axios from "axios";
import { CryptoData } from "../CryptoContext";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import { styled } from "@mui/system";
import { Box } from "@mui/material";
import { CircularProgress } from "@material-ui/core";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";
import { chartDays } from "../Config/data";
import SelectButton from "./Button";
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);
const useStyles = makeStyles(() => ({}));
function CoinInfo({ coin }) {
  const [graphData, setGraphData] = useState();
  const [flag, setFlag] = useState(false);
  const [days, setDays] = useState(1);
  const styles = useStyles();
  const { currency } = CryptoData();

  const fetchHistoricData = async () => {
    try {
      const { data } = await axios.get(
        HistoricalChart(coin.id, days, currency)
      );
      setFlag(true);
      setGraphData(data.prices);
      console.log(data.prices, "==");
    } catch (error) {
      console.log(error);
    }
  };

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      mode: "dark",
    },
  });

  useEffect(() => {
    fetchHistoricData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [days, currency]);

  const CustomBox = styled(Box)(({ theme }) => ({
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
    padding: 40,
    [theme.breakpoints.down("md")]: {
      width: "100%",
      marginTop: 0,
      padding: 20,
      paddingTop: 0,
    },
  }));
  return (
    <ThemeProvider theme={darkTheme}>
      <CustomBox>
        {!graphData | (flag === false) ? (
          <CircularProgress
            style={{ color: "gold" }}
            size={250}
            thickness={1}
          />
        ) : (
          <Line
            data={{
              labels: graphData.map((coin) => {
                let date = new Date(coin[0]);
                let time =
                  date.getHours() > 12
                    ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                    : `${date.getHours()}:${date.getMinutes()} AM`;
                return days === 1 ? time : date.toLocaleDateString();
              }),

              datasets: [
                {
                  data: graphData.map((coin) => coin[1]),
                  label: `Price ( Past ${days} Days ) in ${currency}`,
                  borderColor: "#EEBC1D",
                },
              ],
            }}
            options={{
              elements: {
                point: {
                  radius: 1,
                },
              },
            }}
          />
        )}
        <div
          style={{
            display: "flex",
            marginTop: 20,
            justifyContent: "space-around",
            width: "100%",
          }}
        >
          {chartDays.map((day) => (
            <SelectButton
              key={day.value}
              onClick={() => {
                setDays(day.value);
                setFlag(false);
              }}
              selected={day.value === days}
            >
              {day.label}
            </SelectButton>
          ))}
        </div>
      </CustomBox>
    </ThemeProvider>
  );
}

export default CoinInfo;
