import React from 'react';
import Grid from '@material-ui/core/Grid';
import Post from '../components/post.component';
import { Container } from '@material-ui/core';

export default function CenteredGrid() {

  return (
    <Container className='main-page'>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Post />
        </Grid>
        <Grid item xs={12}>
          <Post />
        </Grid>
        <Grid item xs={12}>
          <Post />
        </Grid>
        <Grid item xs={12}>
          <Post />
        </Grid>
      </Grid>
    </Container>
  );
}
