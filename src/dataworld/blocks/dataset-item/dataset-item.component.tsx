import React, { useEffect, useState } from 'react'
import { Avatar, IconButton, Typography } from '@material-ui/core'
import moment from 'moment'
import {
  ThumbUpAlt,
  ThumbUpAltOutlined,
  LockOutlined, Public
} from '@material-ui/icons';
import { Skeleton } from '@material-ui/lab'
import DatasetAPI, { DatasetValues } from 'api/dataset-api'
import HandleCommon from 'utils/handle-common';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import './dataset-item.scss'
import { DatasetVisibility } from 'app/modules/dataset/_common/common.const';


interface DatasetItemProps {
  isLoading: boolean,
  handleChangeLike: (position: number, accountId: string, isLike: boolean) => {},
  datasetValues: DatasetValues,
  position: number,
  isHiddenDatasetVisibility?: boolean,
}

export default function DatasetItem({
  datasetValues,
  position,
  isLoading,
  handleChangeLike,
  isHiddenDatasetVisibility = true,
}: DatasetItemProps) {

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
        {isLoading ?
          <Skeleton animation="wave" variant="rect" className='p-avatar' /> :
          <Avatar
            aria-label="avatar"
            variant='square'
            className='p-avatar -align-self-center'
            src={datasetValues.dataset.thumbnail}
            onClick={gotoDataset}
          />
        }

        <div className='p-info-text h-ml-14'>
          <div className='h-d_flex -align-center h-mb-6'>
            {isLoading ?
              <>
                <Skeleton height={20} width={150} />
                <Skeleton variant='rect' height={30} width={30} className='h-ml-10' />
              </>
              :
              <>
                <Typography
                  onClick={gotoDataset}
                  variant="body1"
                  className='f-weight-700 -cursor-pointer h-mr-4'
                >
                  {datasetValues.dataset.title}
                </Typography>
                {!isHiddenDatasetVisibility &&
                  <>
                    {datasetValues.dataset.visibility === DatasetVisibility.PRIVATE_DATASET ?
                      <LockOutlined color='action' fontSize='small' /> :
                      <Public color='action' fontSize='small' />
                    }
                  </>
                }
              </>
            }
          </div>

          <div className='h-d_flex'>
            {isLoading ?
              <>
                <Skeleton width={50} height={10} />
                <Skeleton height={10} width={100} className='h-ml-10' />
              </>
              :
              <>
                <Typography variant="body2" className='p-gray-color-typography'>
                  <a href={`/profile/${datasetValues.username}`}>{datasetValues.name}</a>
                </Typography>
                <Typography variant="body2" className='p-gray-color-typography h-ml-10'>
                  Cập nhật {moment(datasetValues.dataset.lastUpdate).fromNow()}
                </Typography>
              </>

            }
          </div>

          <div className='h-d_flex'>
            {isLoading ?
              <>
                <Skeleton width={50} height={10} />
                <Skeleton height={10} width={100} className='h-ml-10' />
              </>
              :
              <>
                <Typography variant="body2" className='p-gray-color-typography'>
                  Số lượng file: {datasetValues.dataset.files.length}
                </Typography>
                <Typography variant="body2" className='p-gray-color-typography h-ml-10'>
                  Dung lượng: {HandleCommon.formatBytes(datasetValues.dataset.size)}
                </Typography>
              </>

            }
          </div>
        </div>
      </div>

      <div>
        {!isLoading &&
          <>
            {like ?
              <IconButton
                onClick={() => changeLike(false)}
              >
                <ThumbUpAlt color='primary' />
              </IconButton> :
              <IconButton
                onClick={() => changeLike(true)}
              >
                <ThumbUpAltOutlined />
              </IconButton>
            }
          </>
        }

        {isLoading ?
          <Skeleton animation="wave" height={10} width={100} className='h-ml-10' /> :
          <Typography variant="body2" className='p-gray-color-typography'>
            Lượt thích: {datasetValues.dataset.countLike}
          </Typography>
        }
      </div>
    </div>
  )
}