import { Container } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import React from 'react';

export default function CenteredGrid() {

  return (
    <Container className='main-page'>
      <Grid container spacing={3}>
        <Grid item xs={12}>
        </Grid>
      </Grid>
    </Container>
  );
}
