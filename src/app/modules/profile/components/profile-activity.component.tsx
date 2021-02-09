import { Paper } from '@material-ui/core'
import React from 'react'
import { ProfileProps } from '../pages/profile.template'

export default function ProfileActivity({ self }: ProfileProps) {
  const { state } = self

  return (
    <Paper className='paper'>Info</Paper>
  )
}