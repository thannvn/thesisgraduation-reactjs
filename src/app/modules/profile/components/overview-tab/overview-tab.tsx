import React, { useState } from 'react'
import { ProfileProps } from 'app/modules/profile/pages/profile.template';
import 'app/modules/profile/css/overview-tab.scss'
import { Button, IconButton, Typography } from '@material-ui/core';
import { EditOutlined } from '@material-ui/icons'
interface OverviewTabProps extends ProfileProps {
  index: number,
  value: number,
}

export default function OverviewTab({ index, value, self }: OverviewTabProps) {
  const [openRecommendModal, setOpenRecommendModal] = useState<boolean>(false)

  const handleOpenRecommendModal = (isOpen: boolean) => {
    setOpenRecommendModal(isOpen)
  }

  return (
    <div hidden={index !== value} className='b-overview-tab'>
      <div className='b-overview-item'>
        <div className='p-current-status'>
          <div className='h-d_flex h-mb-20 -align-center'>
            <Typography className='h-mr-6'>Bạn đang nghĩ gì?</Typography>

            <IconButton>
              <EditOutlined fontSize='small' color='action' />
            </IconButton>
          </div>

          <div className='h-ml-20'>
            <Typography variant='body2'>
              👋 Hi, I’m @thann1999
            </Typography>

            <Typography variant='body2'>
              👀 I’m interested in ...
            </Typography>

            <Typography variant='body2'>
              🌱 I’m currently learning ...
            </Typography>

            <Typography variant='body2'>
              💞️ I’m looking to collaborate on ...
            </Typography>

            <Typography variant='body2'>
              📫 How to reach me ...
            </Typography>
          </div>
        </div>

        <div>
          <Button onClick={() => handleOpenRecommendModal(true)}>
            Yêu thích
          </Button>
        </div>
      </div>
    </div>
  )
}