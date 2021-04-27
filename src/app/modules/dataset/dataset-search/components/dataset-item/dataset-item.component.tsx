import React, { useEffect, useState } from 'react'
import { Avatar, IconButton, Typography } from '@material-ui/core'
import moment from 'moment'
import {
  ThumbUp,
  ThumbUpOutlined,
} from '@material-ui/icons';
import { Skeleton } from '@material-ui/lab'
import DatasetAPI, { DatasetValues } from 'api/dataset-api'
import HandleCommon from 'utils/handle-common';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import { DatasetSearchProps } from 'app/modules/dataset/dataset-search/pages/dataset-search.template'
import { RootState } from 'store';
import 'app/modules/dataset/dataset-search/css/dataset-item.scss'

interface DatasetItemProps extends DatasetSearchProps {
  datasetValues: DatasetValues,
  position: number,
}

export default function DatasetItem({ datasetValues, position, self }: DatasetItemProps) {
  const { state, handleChangeLike } = self
  const [like, setLike] = useState<boolean>(false)
  const user = useSelector((state: RootState) => (state.auth.user))
  const history = useHistory()

  const changeLike = async (isLike: boolean) => {
    await DatasetAPI.likeOrUnLikeDataset(datasetValues.dataset._id)
    handleChangeLike(position, user.accountId, isLike)
  }

  const gotoDataset = () => {
    history.push(`/dataset/${datasetValues.username}/${datasetValues.dataset.url}`)
  }

  useEffect(() => {
    const index = datasetValues.dataset.like.findIndex(item => item === user.accountId)
    setLike(index >= 0 ? true : false)

  }, [datasetValues.dataset.like, user.accountId])

  return (
    <div className='b-info-dataset'>
      <div className='b-info'>
        {state.isLoading ?
          <Skeleton animation="wave" variant="rect" className='p-avatar' /> :
          <Avatar
            aria-label="avatar"
            variant='square'
            className='p-avatar'
            src={datasetValues.dataset.thumbnail}
            onClick={gotoDataset}
          />
        }

        <div className='p-info-text h-ml-14'>
          {state.isLoading ?
            <Skeleton height={20} width="50%" /> :
            <Typography
              gutterBottom
              onClick={gotoDataset}
              variant="body1"
              className='f-weight-700 p-title'
            >
              {datasetValues.dataset.title}
            </Typography>
          }

          <div className='p-inline-info'>
            {state.isLoading ?
              <Skeleton width={50} height={10} /> :
              <Typography variant="body2" className='p-color-content'>
                <a href={`/profile/${datasetValues.username}`}>{datasetValues.name}</a>
              </Typography>
            }
            {state.isLoading ?
              <Skeleton animation="wave" height={10} width={100} className='h-ml-10' /> :
              <Typography variant="body2" className='p-color-content h-ml-10'>
                Cập nhật {moment(datasetValues.dataset.lastUpdate).fromNow()}
              </Typography>
            }
          </div>

          <div className='p-inline-info'>
            {state.isLoading ?
              <Skeleton width={50} height={10} /> :
              <Typography variant="body2" className='p-color-content'>
                Số lượng file: {datasetValues.dataset.files.length}
              </Typography>
            }
            {state.isLoading ?
              <Skeleton animation="wave" height={10} width={100} className='h-ml-10' /> :
              <Typography variant="body2" className='p-color-content h-ml-10'>
                Dung lượng: {HandleCommon.formatBytes(datasetValues.dataset.size)}
              </Typography>
            }
          </div>
        </div>
      </div>

      <div>
        {!state.isLoading &&
          <>
            {like ?
              <IconButton
                onClick={() => changeLike(false)}
                className=''
              >
                <ThumbUp color='primary' fontSize='large' />
              </IconButton> :
              <IconButton
                onClick={() => changeLike(true)}
                className=''
              >
                <ThumbUpOutlined fontSize='large' />
              </IconButton>
            }
          </>
        }

        {state.isLoading ?
          <Skeleton animation="wave" height={10} width={100} className='h-ml-10' /> :
          <Typography variant="body2" className='p-color-content'>
            Lượt thích: {datasetValues.dataset.countLike}
          </Typography>
        }
      </div>
    </div>
  )
}