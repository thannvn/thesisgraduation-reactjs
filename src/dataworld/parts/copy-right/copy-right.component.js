import { Typography, Link } from "@material-ui/core";
import React from "react";

export default function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="/">
        Data World
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
