/*eslint-disable*/
import React from 'react';
// nodejs library to set properties for components
import PropTypes from 'prop-types';
// nodejs library that concatenates classes
import classNames from 'classnames';
// material-ui core components
import { List, ListItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
// @material-ui/icons
import styles from 'styles/jss/material-kit-react/components/footerStyle';
import './footer.scss';

const useStyles = makeStyles(styles);

export default function Footer() {
  const classes = useStyles();

  return (
    <footer className='b-footer'>
      <div className={classes.container}>
        <div className={classes.left}>
          <List className={classes.list}>
            <ListItem className={classes.inlineBlock}>
              <a
                href='https://github.com/thann1999'
                className={classes.block}
                target='_blank'
              >
                Về chúng tôi
              </a>
            </ListItem>

            <ListItem className={classes.inlineBlock}>
              <a href='/' className={classes.block} target='_blank'>
                Mục tiêu
              </a>
            </ListItem>

            <ListItem className={classes.inlineBlock}>
              <a href='/' className={classes.block} target='_blank'>
                Licenses
              </a>
            </ListItem>

            <ListItem className={classes.inlineBlock}>
              <a
                href='https://github.com/thann1999'
                className={classes.block}
                target='_blank'
              >
                Liên hệ
              </a>
            </ListItem>
          </List>
        </div>

        <div className={classes.right} style={{ paddingTop: '8px' }}>
          <List className='h-d_flex list'>
            <ListItem className='item'>
              <span>&copy; {1900 + new Date().getYear()}</span>

              <span className='h-ml-6'>DataWord</span>
            </ListItem>
          </List>
        </div>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  whiteFont: PropTypes.bool,
};
