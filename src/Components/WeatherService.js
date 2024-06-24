import axios from "axios";
import WeatherDisplay from "./WeatherDisplay.js";
import Footer from "./Footer.js";
import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
// import { useSnackbar } from "notistack";
import { useState } from "react";
export default function WeatherService() {
  let [card, setCard] = useState("");
  let [loading, setLoading] = useState(false);
  let [error, setError] = useState("");
  let [errCode, setErrCode] = useState(null);
  let [timer, setTimer] = useState(null);
  let [location, setLocation] = useState("");
  // let { enqueueSnackbar } = useSnackbar();
  let performSearch = async (key, place) => {
    // setLoading(true);
    try {
      // initially setting loading to true to see the loading icon
      setLoading(true);
      // fetching the api response for fulfilled status
      let res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${key}&units=metric`
      );
      // storing the api response in a state variable named card and setting the error code to 0 and error message to success for a fulfilled promise
      setCard(res.data);
      setErrCode(0);
      setError("Success");
    } catch (err) {
      // setting the card variable to null for any status except fulfilled
      setCard("");
      // consoling the err response object and for different status codes setting the errorCodes and errorMessages respectively
      // console.log("33", err.response);
      if (
        err.response &&
        (err.response.status === 404 || err.response.status === 400)
      ) {
        setError(err.response.data.message);
        setErrCode(err.response.data.cod);
      }
      // if (err.response && err.response.status === 404) {
      //   setError(err.response.data.message);
      //   setErrCode(err.response.data.cod);
      //   // enqueueSnackbar(err.response.data.message, { variant: "error" });
      // } else if (err.response && err.response.status === 400) {
      //   setErrCode(err.response.data.cod);
      //   setError(err.response.data.message);
      //   // enqueueSnackbar(err.response.data.message, { variant: "error" });
      // }
    }
    // after getting a response setting the loading to false for hiding the loading icon
    setLoading(false);
  };
  // consoling the error codes, error messages for different user inputs along with the weather card array if the promise is fulfilled
  console.log("55 Error Code", errCode);
  console.log("48 Error Message", error);
  console.log("40 Card Array", card);
  // let timer;
  // let debounceSearch = (e, debounceTimeout) => {
  //   if (timer) {
  //     clearTimeout(timer);
  //   }
  //   timer = setTimeout(() => {
  //     performSearch("62ec384620672179d7376e907e2ceb29", e.target.value);
  //   }, debounceTimeout);
  // };

  // debouncing is to stop fetching the response between two consecutive keyborad clicks for some time to avoid resourceheaviness (here 700 miliseconds)
  let debounceSearch = (e, debounceTimeout) => {
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }
    let timerId = setTimeout(() => {
      performSearch("62ec384620672179d7376e907e2ceb29", e.target.value);
    }, 700);
    setTimer(timerId);
  };

  return (
    <div className="App">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ backgroundColor: "salmon" }}>
          <Typography variant="h6" gutterBottom sx={{ color: "linen" }}>
            Weather App
          </Typography>
        </AppBar>
      </Box>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 3, width: "77%" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-read-only-input"
          label="Enter Location"
          value={location}
          // onChange={(e) => {
          //   debounceSearch(e, 700);
          // }}
          onChange={(e) => {
            setLocation(e.target.value);
            debounceSearch(e, timer);
          }}
        />
      </Box>
      {loading === true ? (
        // showing the loading icon as long as the loading state is true that means as long as the response is not fetched the loading icon will be shown
        <div className="loading">
          <CircularProgress />
          <h5>Loading Weather...</h5>
        </div>
      ) : // hiding the loading icon and start showing the card if promise is fulfilled and response is there
      card !== "" || errCode === 0 ? (
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          sx={{
            minHeight: 300,
          }}
        >
          {/* storing the required fields in their respective variables */}
          <WeatherDisplay
            name={card.name}
            country={card.sys.country}
            feels_like={card.main.feels_like}
            clouds={card.clouds.all}
            icon={card.weather[0].icon}
            main={card.weather[0].main}
            description={card.weather[0].description}
            temp_c={card.main.temp}
            wind_kph={card.wind.speed}
            wind_degree={card.wind.deg}
            humidity={card.main.humidity}
            last_updated={card.dt}
          />
        </Stack>
      ) : // showing the intial alert for null errCode (which is there initially without searching for anything)
      errCode === null ? (
        <Stack direction="row" justifyContent="center" alignItems="flex-end">
          <Alert severity="info" className="initial-alert">
            Nothing to show, Enter a location to show live weather
          </Alert>
        </Stack>
      ) : (
        // showing the error messeages through an alert for respective errCodes which are not null (that means something has been searched and errCode is not null now, so errCodes can be either 404 or 400)
        <Stack direction="row" justifyContent="center" alignItems="flex-end">
          <Alert severity="error">{error}</Alert>
        </Stack>
      )}
      <Footer />
    </div>
  );
}
