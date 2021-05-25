import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Tooltip,
  Typography
} from '@material-ui/core';
import {
  ThumbUp, ThumbUpOutlined
} from '@material-ui/icons';
import { useHistory } from 'react-router';
import 'app/modules/dataset/dataset-list/css/dataset-post.scss';
import moment from 'moment'
import DatasetAPI, { DatasetValues } from 'api/dataset-api';
import HandleCommon from 'utils/handle-common';
import { Skeleton } from '@material-ui/lab';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { DatasetListProps } from '../pages/dataset-list.template';

interface DatasetPostProps extends DatasetListProps {
  isTagsList: boolean,
  listIndex: number,
  datasetsIndex: number,
  datasetValues: DatasetValues
}

export default function DatasetPost(props: DatasetPostProps) {
  const { datasetValues, self, isTagsList, listIndex, datasetsIndex } = props
  const { state, handleChangeLike } = self
  const [like, setLike] = useState<boolean>(false)
  const history = useHistory()
  const user = useSelector((state: RootState) => (state.auth.user))

  const changeLike = async (isLike: boolean) => {
    await DatasetAPI.likeOrUnLikeDataset(datasetValues.dataset._id)
    handleChangeLike(isTagsList, listIndex, datasetsIndex, user.accountId, isLike)
  }

  const gotoProfileOwner = () => {
    history.push(`/profile/${datasetValues.username}`)
  }

  const gotoDataset = () => {
    history.push(`/dataset/${datasetValues.username}/${datasetValues.dataset.url}`)
  }

  useEffect(() => {
    const index = datasetValues.dataset.like.findIndex(item => item === user.accountId)
    setLike(index >= 0 ? true : false)

  }, [datasetValues.dataset.like, user.accountId])

  return (
    <Card className='b-card-post'>
      <CardHeader
        avatar={state.isLoading ?
          <Skeleton animation="wave" variant="circle" width={40} height={40} /> :
          <Avatar
            aria-label="avatar"
            src={datasetValues.avatar}
            onClick={gotoProfileOwner}
          />}
        action={!state.isLoading &&
          <>
            {like ?
              <IconButton
                onClick={() => changeLike(false)}
                className='p-button-action h-mt-14 h-mr-8'
              >
                <ThumbUp color='primary' />
              </IconButton> :
              <IconButton
                onClick={() => changeLike(true)}
                className='p-button-action h-mt-14 h-mr-8'
              >
                <ThumbUpOutlined />
              </IconButton>
            }
          </>
        }
        title={state.isLoading ?
          <Skeleton animation="wave" height={10} width="75%" /> :
          <Tooltip title={datasetValues.name}>
            <Typography
              onClick={gotoProfileOwner}
              className='p-account-name'>
              {datasetValues.name}
            </Typography>
          </Tooltip>
        }
        subheader={state.isLoading ?
          <Skeleton animation="wave" height={10} width="45%" /> :
          `Cập nhật ${moment(datasetValues.dataset.lastUpdate).fromNow()}`
        }
      />
      <CardActionArea onClick={gotoDataset} className='b-content'>
        {state.isLoading ?
          <Skeleton className='p-thumbnail' /> :
          <CardMedia
            className='p-thumbnail'
            image={datasetValues.dataset.banner}
          />
        }

        <CardContent>
          {state.isLoading ?
            <Skeleton height={20} width="50%" /> :
            <Tooltip title={datasetValues.dataset.title}>
              <Typography gutterBottom variant="body1" className='f-weight-700'>
                {datasetValues.dataset.title}
              </Typography>
            </Tooltip>
          }

          {state.isLoading ?
            <Skeleton height={10} width="40%" /> :
            <Typography variant="body2" className='p-color-content'>
              {datasetValues.dataset.countLike} lượt thích
              • {datasetValues.dataset.downloads} lượt tải về
            </Typography>
          }

          {state.isLoading ?
            <Skeleton height={10} width="45%" /> :
            <div className='h-d_flex -align-center'>
              <Typography variant="body2" className='p-color-content'>
                Số lượng file: {datasetValues.dataset.files.length}
              </Typography>

              <Typography variant='body2' className='h-ml-4'>
                ({datasetValues.dataset.fileTypes.map((item, index) =>
                <span key={index}>{item}</span>)
                })
              </Typography>
            </div>

          }

          {state.isLoading ?
            <Skeleton height={10} width="70%" /> :
            <Typography variant="body2" className='p-color-content'>
              Dung lượng: {HandleCommon.formatBytes(datasetValues.dataset.size)}
            </Typography>
          }
        </CardContent>
      </CardActionArea>
    </Card>
  )
}