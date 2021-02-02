// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import styles from "../../../../styles/jss/material-kit-react/views/components";
import GridContainer from "../components/grid-container.component";
import GridItem from "../components/grid-item.component";
import React from "react";
// @material-ui/icons
// core components
import Header from "../components/header.component";
// sections for this page
import HeaderLinks from "../components/header-links.component";
import Parallax from "../components/parallax.component";
import Footer from "../../../../dataworld/blocks/footer/footer";

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
      <Parallax image={process.env.PUBLIC_URL + '/images/introduce2.jpg'}>
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
