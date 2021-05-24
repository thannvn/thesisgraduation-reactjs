import { IconButton, Typography } from '@material-ui/core';
import { EditOutlined } from '@material-ui/icons';
import { Tags } from 'api/dataset-api';
import 'app/modules/profile/css/overview-tab.scss';
import { ProfileProps } from 'app/modules/profile/pages/profile.template';
import RecommendDialog from 'dataworld/blocks/recommend/recommend-dialog/recommend-dialog.component';
import queryString from 'query-string';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
interface OverviewTabProps extends ProfileProps {
  index: number,
  value: number,
}

export default function OverviewTab({ index, value, self }: OverviewTabProps) {
  const { state, setRecommend } = self
  const [openRecommendModal, setOpenRecommendModal] = useState<boolean>(false)
  const history = useHistory()

  const handleOpenRecommendModal = (isOpen: boolean) => {
    setOpenRecommendModal(isOpen)
  }

  const handleSearchTags = (tags: object) => {
    const searchString = queryString.stringify(tags, { arrayFormat: "index" })
    history.push(`/dataset/search?${searchString}`)
  }

  const saveRecommend = (tags: Array<Tags>) => {
    setRecommend(tags)
    setOpenRecommendModal(false)
  }

  return (
    <div hidden={index !== value} className='b-overview-tab'>
      <div className='b-overview-item'>
        <div className='h-d_flex h-mb-20 -align-center -justify-space-between'>
          <Typography className='h-mr-6 f-weight-700'>Bạn đang nghĩ gì?</Typography>

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

      <div className='b-overview-item  h-mt-20'>
        <div className='h-d_flex h-mb-12 -align-center -justify-space-between'>
          <Typography className='h-mr-6 f-weight-700'>Danh sách yêu thích</Typography>

          <IconButton onClick={() => handleOpenRecommendModal(true)}>
            <EditOutlined fontSize='small' color='action' />
          </IconButton>
        </div>

        <div className='h-d_flex h-ml-10'>
          {state.userInfo.recommend.map((item, index) => (
            < Typography
              style={{ color: '#539bfa' }}
              className='-cursor-pointer h-ml-2'
              onClick={() => handleSearchTags({ tags: [item.name] })}
              key={index}
            >
              {index !== state.userInfo.recommend.length - 1 ? `${item.name},` : item.name}
            </Typography>
          ))}
        </div>


        <RecommendDialog
          isOpen={openRecommendModal}
          onClose={() => handleOpenRecommendModal(false)}
          currentRecommend={self.state.userInfo.recommend}
          onSubmit={saveRecommend}
        />
      </div>
    </div>
  )
}