import { Tooltip, Typography } from '@material-ui/core';
import { CheckCircle } from '@material-ui/icons';
import { Skeleton } from '@material-ui/lab';
import React from 'react';
import './recommend-post.scss';

interface RecommendPostProps {
  isLoading: boolean,

}

export default function RecommendPost({ isLoading }: RecommendPostProps) {
  const gotoDataset = () => {
  }

  return (
    <div className='b-recommend-post'>
      {isLoading ?
        <Skeleton animation="wave" variant="rect" className='p-avatar' /> :
        <img
          alt=''
          className='p-thumbnail -cursor-pointer'
          src={`${process.env.PUBLIC_URL}/images/post.jpg`}
          onClick={gotoDataset}
        />
      }

      <div className='b-info h-ml-14'>
        <div className=''>
          {isLoading ?
            <>
              <Skeleton height={20} width={150} />
              <Skeleton height={20} width={150} />
              <Skeleton height={20} width={150} />
            </>
            :
            <>
              <Tooltip title='This is dataset demo This is dataset demo This is dataset demo'>
                <Typography
                  onClick={gotoDataset}
                  variant="body1"
                  className='f-weight-700 -cursor-pointer p-title'
                >
                  This is dataset demo
              </Typography>
              </Tooltip>


              <div className='-cursor-pointer h-d_flex -align-center h-mt-4'>
                <Typography variant="body2"
                  className='f-weight-700 h-mr-4 p-gray-color-typography'>
                  Thann
                </Typography>

                <CheckCircle color='action' style={{ fontSize: '14px' }} />
              </div>

              <Typography variant="body2" className='p-gray-color-typography'>
                Dung lượng: 5MB
              </Typography>

              <Typography variant="body2" className='p-gray-color-typography'>
                1000 lượt thích • 100 lượt tải về
              </Typography>

              <Typography variant="body2" className='p-gray-color-typography'>
                Cập nhật 2 ngày trước
              </Typography>
            </>
          }
        </div>
      </div>
    </div>
  )
}