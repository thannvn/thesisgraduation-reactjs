import { Grid } from '@material-ui/core'
import Footer from 'dataworld/blocks/footer/footer.component'
import Loading from 'dataworld/blocks/loading/loading-page.component'
import React from 'react'
import { useLocation } from 'react-router'
import ProfileActivity from '../components/profile-activity/profile-activity.component'
import ProfileInfo from '../components/profile-info/profile-info.component'
import '../css/profile.scss'
import Profile from './profile.component'

export interface ProfileProps {
  self: Profile
}

interface LocationState {
  tabIndex: number
}

export default function ProfileTemplate({ self }: ProfileProps) {
  const { state } = self
  const location = useLocation<LocationState>()

  return (
    <>
      {state.isLoading ?
        <Loading />
        :
        <div className='h-mt-100 h-ml-100 h-mr-100'>
          <Grid container className='h-mb-40'>
            <Grid item xs={4}>
              <ProfileInfo self={self} />
            </Grid>

            <Grid item xs={8}>
              <ProfileActivity
                self={self}
                tabIndex={location.state?.tabIndex || 0}
              />
            </Grid>
          </Grid>

          <Footer />
        </div>}
    </>

  )
}