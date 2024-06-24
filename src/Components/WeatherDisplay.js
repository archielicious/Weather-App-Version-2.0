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
  // below is the method for converting the fetched wind degrees to corresponding wind direction, it is the standard comapss rose convention, which refers any degrees from  0 degrees to 22.5 as N, 22.5 degrees to 45 as NNE and so on
  // since there are 16 cardinal directions in the compass each direction would consist 22.5 degrees
  // so for getting the direction from the degees we will divide the given degees by 22.5 and take its floor value to correctly get its corresponding indexed direction
  // we will do modulus 16 to the result so that if the degrees exceed 359.9 and become 360, instead of getting undefined as the direction, the index will start again from 0 means it will start from N again
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

  // let standard_index = Math.floor(wind_degree / 22.5) % 16;
  // let wind_direction = cardinalDirections[standard_index];

  // below is another method for converting wind degrees to wind direction, it is the centered compass rose convention, which refers to any degrees between 348.75 to 11.25 as N, 11.25 to 33.75 as NNE and so on
  // first we will add 11.25 to the given degrees to bring it to the range for the centered convention
  // then we will divide the centered convention adjusted degrees by 22.5 and take the floor value value to get the corresponding indexed direction
  // we will do modulus 16 to the resulted index so that a resulted index greater than 15 will again start from 0 that means from N
  let centered_convention_degrees = wind_degree + 11.25;
  let centered_convention_corresponding_index =
    Math.floor(centered_convention_degrees / 22.5) % 16;
  let wind_direction =
    cardinalDirections[centered_convention_corresponding_index];

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
