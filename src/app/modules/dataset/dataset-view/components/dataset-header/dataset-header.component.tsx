import { Avatar, IconButton, Typography } from '@material-ui/core';
import {
  ThumbUp, ThumbUpOutlined,
  VisibilityOffOutlined,
  VisibilityOutlined
} from '@material-ui/icons';
import { Skeleton } from '@material-ui/lab';
import DatasetAPI from 'api/dataset-api';
import { DatasetVisibility } from 'app/const/dataset/common.const';
import 'app/modules/dataset/dataset-view/css/dataset-header.scss';
import { DatasetViewContext } from 'app/modules/dataset/dataset-view/pages/context.component';
import React, { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { RootState } from 'store';


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
                <Typography className='h-ml-4'>Private Dataset</Typography>
              </> :
              <>
                <VisibilityOutlined />
                <Typography className='h-ml-4'>Public Dataset</Typography>
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
          <Typography className='h-ml-10 h-mr-20' >
            <a href={`/profile/${datasetValues.username}`}>{datasetValues.name}</a>
          </Typography>
        }
      </div>

      <div className='p-like'>
        {isLoadingData ?
          <Skeleton width={40} /> :
          <>
            {like ?
              <IconButton onClick={() => changeLike(false)}>
                <ThumbUp color='primary' />
              </IconButton> :
              <IconButton onClick={() => changeLike(true)}>
                <ThumbUpOutlined />
              </IconButton>
            }
            <Typography className='h-ml-4'>{datasetValues.dataset.countLike}</Typography>
          </>
        }
      </div>
    </div >
  )
}