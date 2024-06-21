import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
export default function WeatherDisplay({
  name,
  icon,
  description,
  main,
  temp_c,
  wind_kph,
  humidity,
}) {
  return (
    <>
      <Typography variant="h5" gutterBottom>
        {name}
      </Typography>
      {/* <Card sx={{ width: "67%" }}> */}
      <Card sx={{ minWidth: "67%" }}>
        <CardContent>
          <Stack direction="row" justifyContent="center" spacing={2}>
            <img
              src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
              alt={main}
            />
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
              Temperature
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
              {temp_c}&#176;C
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
              Wind Speed
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
              {((wind_kph * 18) / 5).toFixed(2)} km/h
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    </>
  );
}
// the above component is exported to the weatherService.js file along with the required props
