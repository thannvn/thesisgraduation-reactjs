/*eslint-disable*/
import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import styles from "../../../../styles/jss/material-kit-react/components/headerLinksStyle";
import CustomButton from "../../../../dataworld/parts/button/custom-button.component";

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
