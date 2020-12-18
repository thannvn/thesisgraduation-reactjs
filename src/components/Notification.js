import { Snackbar, makeStyles } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import React from "react";

const useStyles = makeStyles((theme) => ({
  notify: {
    fontSize: "1.5rem!important",
  },
}));

export default function Notification(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  return (
    <>
      <Snackbar
        className={classes.notify}
        open={open}
        autoHideDuration={6000}
        variant="filled"
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={props.type}>
          {props.notify}
        </Alert>
      </Snackbar>
    </>
  );
}
