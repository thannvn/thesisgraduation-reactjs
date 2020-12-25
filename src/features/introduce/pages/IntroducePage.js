// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import styles from "../../../assets/jss/material-kit-react/views/components";
import GridContainer from "../components/GridContainer";
import GridItem from "../components/GridItem";
import React from "react";
import img from "../../../assets/images/introduce2.jpg";
// @material-ui/icons
// core components
import Header from "../components/Header";
// sections for this page
import HeaderLinks from "../components/HeaderLinks";
import Parallax from "../components/Parallax";
import Footer from "../../../components/Footer";

const useStyles = makeStyles(styles);

export default function IntroducePage(props) {
  const classes = useStyles();
  const { ...rest } = props;
  return (
    <>
      <Header
        brand="Material Kit React"
        rightLinks={<HeaderLinks />}
        fixed
        color="transparent"
        {...rest}
      />
      <Parallax image={img}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem>
              <div className={classes.brand}>
                <h1 className={classes.title}>Material Kit React.</h1>
                <h3 className={classes.subtitle}>
                  A Badass Material-UI Kit based on Material Design.
                </h3>
              </div>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <Footer />
    </>
  );
}
