import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
export default function WeatherDisplay({
  // here we are using the props from the parent component (weatherService.js) to fill the weatherDisplay.js card values
  name,
  country,
  feels_like,
  clouds,
  icon,
  description,
  main,
  temp_c,
  wind_kph,
  wind_degree,
  humidity,
  last_updated,
}) {
  // here we are converting the unix timestamp (fetched from the api endpoint) to javascript timestamp by multiplying 1000, then we are getting the current date by using the new Date(javascript timestamp) method
  let date = new Date(last_updated * 1000);
  // options are used to format the date, month and year into numeric or string values. Here we are using numeric values for day and year and string value for month
  let options = { day: "numeric", month: "long", year: "numeric" };
  // below is the method for converting the fetched wind degrees to corresponding wind direction
  let cardinalDirections = [
    "N",
    "NNE",
    "NE",
    "ENE",
    "E",
    "ESE",
    "SE",
    "SSE",
    "S",
    "SSW",
    "SW",
    "WSW",
    "W",
    "WNW",
    "NW",
    "NNW",
  ];

  const index = Math.floor(wind_degree / 22.5);
  let wind_direction = cardinalDirections[index];
  return (
    <>
      <Typography variant="h5">
        {name}, {country}
      </Typography>
      {/* <Card sx={{ width: "67%" }}> */}
      <Card sx={{ minWidth: "67%" }}>
        <CardContent>
          <Stack direction="row" justifyContent="center" spacing={2}>
            <Typography variant="subtitle1" gutterBottom>
              Feels like {feels_like.toFixed(1)}&#176;C
            </Typography>
          </Stack>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <img
              // We are getting the icon code from the api endpoint and converting that to an icon by using this link where icon is dynamically updated for different cities
              src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
              alt={main}
            />
            <Typography
              variant="h5"
              gutterBottom
              sx={{
                borderLeft: "2px solid salmon",
                paddingLeft: "1.65rem",
              }}
            >
              {temp_c.toFixed(1)}&#176;C
            </Typography>
          </Stack>

          <Stack direction="row" justifyContent="space-between" spacing={2}>
            <Typography variant="subtitle2" gutterBottom>
              Condition
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
              {description}
            </Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between" spacing={2}>
            <Typography variant="subtitle2" gutterBottom>
              Humidity
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
              {humidity}%
            </Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between" spacing={2}>
            <Typography variant="subtitle2" gutterBottom>
              Clouds
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
              {clouds}%
            </Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between" spacing={2}>
            <Typography variant="subtitle2" gutterBottom>
              Wind Speed
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
              {/* Since in the api endpoint wind speed is in meter/second unit we are converting that to km/hour by multiplying 18 and dividing by 5. Again we are limiting the decimal places by using toFixed() method. */}
              {((wind_kph * 18) / 5).toFixed(2)} km/h
            </Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between" spacing={2}>
            <Typography variant="subtitle2" gutterBottom>
              Wind Direction
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
              {wind_direction}
            </Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between" spacing={2}>
            <Typography variant="subtitle2" gutterBottom>
              Last Updated
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
              {/* en-US is used to format the date into US style of writing */}
              {`${date.toLocaleString(
                "en-US",
                options
              )}, ${date.toLocaleTimeString("en-US")}`}
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    </>
  );
}
// the above component is exported to the weatherService.js file
