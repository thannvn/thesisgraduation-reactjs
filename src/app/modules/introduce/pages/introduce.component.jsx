import React from 'react';
import clsx from 'clsx';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import styles from '../../../../styles/jss/material-kit-react/views/components';
import { useSelector } from 'react-redux';
import GridContainer from '../components/grid-container.component';
import GridItem from '../components/grid-item.component';
// @material-ui/icons
import Header from '../components/header.component';
// sections for this page
import HeaderLinks from '../components/header-links.component';
import Parallax from '../components/parallax.component';
import Footer from '../../../../dataworld/blocks/footer/footer.component';
import '../css/introduce.scss';

const useStyles = makeStyles(styles);

export default function IntroducePage(props) {
  const classes = useStyles();
  const user = useSelector((state) => state.auth);
  const { ...rest } = props;
  return (
    <>
      {user.user.accountId === '' && (
        <Header
          brand='Data world'
          rightLinks={<HeaderLinks />}
          fixed
          color='transparent'
          {...rest}
        />
      )}

      <Parallax
        image={process.env.PUBLIC_URL + '/images/introduce2.jpg'}
        className={clsx({ 'margin-header': user.user.accountId })}
      >
        <div className={classes.container}>
          <GridContainer>
            <GridItem>
              <div className={classes.brand}>
                <h1 className={classes.title}>Data world</h1>
                <h3 className={classes.subtitle}>Quản lý và chia sẻ Dataset</h3>
              </div>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <Footer />
    </>
  );
}
