import { Tooltip, Typography } from '@material-ui/core';
import { CheckCircle } from '@material-ui/icons';
import { Skeleton } from '@material-ui/lab';
import { DatasetValues } from 'api/dataset-api';
import moment from 'moment';
import React from 'react';
import { useHistory } from 'react-router';
import HandleCommon from 'utils/handle-common';
import './recommend-post.scss';

interface RecommendPostProps {
  isLoading: boolean,
  dataset: DatasetValues,
}

export default function RecommendPost({ isLoading, dataset }: RecommendPostProps) {
  const history = useHistory()

  const gotoDataset = () => {
    history.push(`/dataset/${dataset.username}/${dataset.dataset.url}`)
  }

  const gotoProfile = () => {
    history.push(`/profile/${dataset.username}`)
  }

  return (
    <div className='b-recommend-post h-mt-6'>
      {isLoading ?
        <Skeleton animation="wave" variant="rect" className='p-avatar' /> :

        <img
          alt=''
          className='p-thumbnail -cursor-pointer'
          src={dataset.dataset.thumbnail}
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
              <Tooltip title={dataset.dataset.title}>
                <Typography
                  onClick={gotoDataset}
                  variant="body1"
                  className='f-weight-700 -cursor-pointer p-title'
                >
                  {dataset.dataset.title}
                </Typography>
              </Tooltip>

              <div className='-cursor-pointer h-d_flex -align-center h-mt-4'>
                <Typography
                  variant="body2"
                  className='f-weight-700 h-mr-4 p-gray-color-typography'
                  onClick={gotoProfile}
                >
                  {dataset.name}
                </Typography>

                <CheckCircle color='action' style={{ fontSize: '14px' }} />
              </div>

              <Typography variant="body2" className='p-gray-color-typography'>
                Dung lượng: {HandleCommon.formatBytes(dataset.dataset.size)}
              </Typography>

              <Typography variant="body2" className='p-gray-color-typography'>
                {dataset.dataset.countLike} lượt thích • {dataset.dataset.downloads} lượt tải về
              </Typography>

              <Typography variant="body2" className='p-gray-color-typography'>
                {`Cập nhật ${moment(dataset.dataset.lastUpdate).fromNow()}`}
              </Typography>
            </>
          }
        </div>
      </div>
    </div>
  )
}