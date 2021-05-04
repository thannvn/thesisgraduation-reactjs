import { Paper, Tab, Tabs, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import { ImportContactsTwoTone, StorageOutlined } from '@material-ui/icons';
import { ProfileProps } from 'app/modules/profile/pages/profile.template'
import 'app/modules/profile/css/profile-activity.scss'
import StorageTab from '../storage-tab/storage-tab.component';

interface ProfileActivityProps extends ProfileProps {
  tabIndex: number
}

export default function ProfileActivity({ self, tabIndex }: ProfileActivityProps) {
  const [value, setValue] = useState<number>(tabIndex)

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Paper className='b-profile-activity h-ml-10'>
      <Tabs value={value} onChange={handleChange}>
        <Tab label={
          <Typography variant='body2' className='h-d_flex -align-center'>
            <ImportContactsTwoTone />
            <span className='h-ml-4'>
              Tổng quan
            </span>
          </Typography>} />

        <Tab label={
          <Typography variant='body2' className='h-d_flex -align-center'>
            <StorageOutlined />
            <span className='h-ml-4'>
              Kho lưu trữ
            </span>
          </Typography>}
        />
      </Tabs>

      <StorageTab
        index={1}
        value={value}
        self={self}
      />
    </Paper>
  )
}