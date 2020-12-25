/*eslint-disable*/
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import { CloudDownload } from "@material-ui/icons";
import React from "react";
import styles from "../../../assets/jss/material-kit-react/components/headerLinksStyle";
import CustomButton from "../../../components/custom/CustomButton";

const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
  const classes = useStyles();
  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <CustomButton
          href="/auth/login"
          color="transparent"
          className={classes.navLink}
        >
          Đăng nhập
        </CustomButton>
      </ListItem>
      <ListItem className={classes.listItem}>
        <CustomButton
          href="/auth/register"
          color="transparent"
          className={classes.navLink}
        >
          Đăng ký
        </CustomButton>
      </ListItem>
    </List>
  );
}
