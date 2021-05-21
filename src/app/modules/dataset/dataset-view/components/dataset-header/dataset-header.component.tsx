import { Avatar, IconButton, Tooltip, Typography } from '@material-ui/core';
import {
  ThumbUp, ThumbUpOutlined,
  VisibilityOffOutlined,
  VisibilityOutlined, EventNoteOutlined,
  CloudDownloadOutlined,
} from '@material-ui/icons';
import { Skeleton } from '@material-ui/lab';
import DatasetAPI from 'api/dataset-api';
import { DatasetVisibility } from 'app/modules/dataset/_common/common.const';
import 'app/modules/dataset/dataset-view/css/dataset-header.scss';
import { DatasetViewContext } from 'app/modules/dataset/dataset-view/pages/context.component';
import React, { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { RootState } from 'store';
import moment from 'moment';

interface DescriptionUpdateProps {
  createdDate: Date | string,
  lastUpdate: Date | string
}

const DescriptionUpdate = ({ createdDate, lastUpdate }: DescriptionUpdateProps) => {
  return (
    <>
      <Typography variant='body2'>
        Ngày tạo: {moment(createdDate).locale('vi').format('MMMM Do YYYY, hh:mm a')}
      </Typography>

      <Typography variant='body2'>
        Cập nhật gần nhất: {moment(lastUpdate).locale('vi').format('MMMM Do YYYY, hh:mm a')}
      </Typography>
    </>
  )
}

export default function DatasetHeader() {
  const { datasetValues, isLoadingData, handleChangeLike } = useContext(DatasetViewContext)
  const history = useHistory()
  const [like, setLike] = useState<boolean>(false)
  const user = useSelector((state: RootState) => (state.auth.user))

  const changeLike = async (isLike: boolean) => {
    await DatasetAPI.likeOrUnLikeDataset(datasetValues.dataset._id)
    handleChangeLike(isLike)
  }

  const gotoProfileOwner = () => {
    history.push(`/profile/${datasetValues.username}`)
  }


  useEffect(() => {
    const index = datasetValues.dataset.like.findIndex(item => item === user.accountId)
    setLike(index >= 0 ? true : false)
  }, [datasetValues.dataset.like, user.accountId])

  return (
    <div
      className='b-dataset-header'
      style={{
        backgroundImage: `url("${datasetValues.dataset.banner}")`,
      }}>

      <div className='p-visibility h-mt-16 h-ml-24'>
        {isLoadingData ?
          <Skeleton width={100} /> :
          <>
            {datasetValues.dataset.visibility === DatasetVisibility.PRIVATE_DATASET ?
              <>
                <VisibilityOffOutlined />
                <Typography className='h-ml-4'>Dataset cá nhân</Typography>
              </> :
              <>
                <VisibilityOutlined />
                <Typography className='h-ml-4'>Dataset cộng đồng</Typography>
              </>
            }
          </>
        }
      </div>

      <div className='p-title h-mt-24 h-ml-24'>
        {isLoadingData ?
          <Skeleton width="60%" /> :
          <Typography variant='h6' >{datasetValues.dataset.title}</Typography>
        }

        {isLoadingData ?
          <Skeleton width="70%" /> :
          <Typography variant='h6' >{datasetValues.dataset.subtitle}</Typography>
        }
      </div>

      <div className='p-owner-dataset h-ml-24'>
        {isLoadingData ?
          <Skeleton variant="rect" width={40} height={40} /> :
          <IconButton onClick={gotoProfileOwner}>
            <Avatar
              variant='square'
              src={datasetValues.avatar}
            />
          </IconButton>
        }

        {isLoadingData ?
          <Skeleton width={150} className='h-ml-10' /> :
          <div className='h-d_flex '>
            <Typography className='h-ml-10 h-mr-20' >
              <a href={`/profile/${datasetValues.username}`}>{datasetValues.name}</a>
            </Typography>

            <Tooltip
              title={
                <DescriptionUpdate
                  createdDate={datasetValues.dataset.createdDate}
                  lastUpdate={datasetValues.dataset.lastUpdate}
                />
              }
              arrow>
              <EventNoteOutlined />
            </Tooltip>
          </div>
        }
      </div>

      <div className='b-action'>
        {isLoadingData ?
          <Skeleton width={40} /> :
          <>
            <div className='p-item h-d_flex -align-content'>
              <div className='h-d_flex p-info-item'>
                <VisibilityOffOutlined fontSize='small' />
                <Typography variant='body2' className='h-ml-4 h-mr-2'>Lượt xem</Typography>
              </div>

              <div className='p-number-item'>
                <Typography variant='body2' className='h-ml-2 h-mr-2'>{datasetValues.dataset.views}</Typography>
              </div>
            </div>

            <div className='p-item h-d_flex -align-content h-ml-10'>
              <div className='h-d_flex p-info-item'>
                <CloudDownloadOutlined fontSize='small' />
                <Typography variant='body2' className='h-ml-4 h-mr-2'>Tải về</Typography>
              </div>

              <div className='p-number-item'>
                <Typography variant='body2' className='h-ml-2 h-mr-2'>{datasetValues.dataset.downloads}</Typography>
              </div>
            </div>

            <div className='p-item h-d_flex -align-content h-ml-10'>
              <div
                onClick={like ? () => changeLike(false) : () => changeLike(true)}
                className='h-d_flex p-info-item -cursor-pointer'>
                {like ?
                  <ThumbUp fontSize='small' color='primary' /> :
                  <ThumbUpOutlined fontSize='small' />
                }
                <Typography variant='body2' className='h-ml-4 h-mr-2'>Lượt thích</Typography>
              </div>

              <div className='p-number-item'>
                <Typography variant='body2' className='h-ml-2 h-mr-2'>{datasetValues.dataset.countLike}</Typography>
              </div>
            </div>
          </>
        }
      </div>
    </div >
  )
}