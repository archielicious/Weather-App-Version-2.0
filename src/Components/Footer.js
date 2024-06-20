import * as React from "react";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
export default function Footer() {
  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: "black",
      }}
      component="footer"
    >
      <Box sx={{ paddingBottom: 0.25, paddingTop: 0.5 }}>
        <Link href="https://openweathermap.org/">
          <img
            id="Footer-Image"
            src="https://openweathermap.org/themes/openweathermap/assets/img/logo_white_cropped.png"
            alt="Weather data by openweathermap.org"
            border="0"
          />
        </Link>
        <Typography variant="body1" display="block" color="white">
          Developed by{" "}
          <Link
            href="https://github.com/archielicious"
            underline="none"
            color="crimson"
          >
            Archishman Dash
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}
