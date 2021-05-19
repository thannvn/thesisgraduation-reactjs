import { Paper, Tab, Tabs, Typography } from '@material-ui/core';
import {
  SettingsOutlined, StorageRounded, ImportContactsTwoTone
} from '@material-ui/icons';
import 'app/modules/profile/css/profile-activity.scss';
import { ProfileProps } from 'app/modules/profile/pages/profile.template';
import React, { useState } from 'react';
import AccountSettings from '../account-setting-tab/account-settings.component';
import OverviewTab from '../overview-tab/overview-tab';
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
          </Typography>}
        />

        <Tab label={
          <Typography variant='body2' className='h-d_flex -align-center'>
            <StorageRounded />
            <span className='h-ml-4'>
              Kho lưu trữ
            </span>
          </Typography>}
        />

        <Tab label={
          <Typography variant='body2' className='h-d_flex -align-center'>
            <SettingsOutlined />
            <span className='h-ml-4'>
              Cài đặt
            </span>
          </Typography>}
        />
      </Tabs>

      <OverviewTab
        index={0}
        value={value}
        self={self}
      />

      <StorageTab
        index={1}
        value={value}
        self={self}
      />

      <AccountSettings
        index={2}
        value={value}
        self={self}
      />
    </Paper>
  )
}