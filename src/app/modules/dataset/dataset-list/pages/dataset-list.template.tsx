import { Button, Container, Grid, Link, Typography } from '@material-ui/core'
import React from 'react'
import DatasetList from './dataset-list.component'
import {
  TrendingUp, StarsOutlined,
  FiberNewOutlined, Add
} from '@material-ui/icons';
import 'app/modules/dataset/dataset-list/css/dataset-list.scss'
import DatasetPost from 'app/modules/dataset/dataset-list/components/dataset-post.component';
import { Skeleton } from '@material-ui/lab';
import SearchBar from 'dataworld/blocks/search-bar/search-bar.component';
import clsx from 'clsx';
import { ListIndex } from '../const/list-index.const'

export interface DatasetListProps {
  self: DatasetList
}

export default function DatasetListTemplate({ self }: DatasetListProps) {
  const { state, handleSearchAlls, handleCreateDataset } = self

  return (
    <>
      <Container style={{ maxWidth: '100%' }} className='h-mt-100 h-mb-100'>
        <div className='t-dataset-list'>
          <div className='h-mb-16'>
            <Typography variant='h4' className='f-weight-700'>Datasets</Typography>

            <Typography className='h-mt-16' style={{ width: '400px' }}>
              Tìm kiếm, chia sẻ và quản lý datasets của bạn tốt hơn cùng DataWorld.
            </Typography>
          </div>

          <div className='b-header'>
            <Button
              variant='contained'
              color='primary'
              className='h-mb-32 p-round-button'
              onClick={handleCreateDataset}
              startIcon={<Add />}
            >
              Tạo Dataset
            </Button>

            <SearchBar />

            <div className='popular-tags h-mt-10'>
              {state.datasetValuesList.tagsDatasets.map((tags, index) =>
                <div key={index}>
                  {
                    state.isLoading ?
                      <Skeleton width={100} height={50} className='h-ml-8' /> :
                      <Button
                        key={index}
                        variant='outlined'
                        onClick={() => handleSearchAlls({ tags: [tags.name] })}
                        className={clsx({
                          'h-ml-8': index !== 0
                        })}
                      >
                        <span className='f-weight-700'>{tags.name}</span>
                        <span className='h-ml-6 p-gray-color-typography'>{tags.datasetsLength}</span>
                      </Button>
                  }
                </div>
              )}
            </div>
          </div>

          <div className='b-list h-mt-100'>
            <div className='b-list-by-tags h-mt-32'>
              <div className='p-title'>
                <div>
                  {!state.isLoading && <TrendingUp className='h-mr-20' />}

                  {state.isLoading ?
                    <Skeleton width={200} height={30} /> :
                    <Typography variant='h5' className='f-weight-700'>
                      Top lượt thích
                  </Typography>}
                </div>

                {!state.isLoading &&
                  <Button className='p-round-button' onClick={() => handleSearchAlls({ like: 'desc' })}>
                    <Typography className='f-weight-700'>Tất cả</Typography>
                  </Button>
                }
              </div>

              <div className='h-mt-32'>
                <Grid container spacing={3}>
                  {state.datasetValuesList.topDatasets.map((dataset, index) =>
                    <Grid item xs={3} key={index}>
                      <DatasetPost
                        datasetValues={dataset}
                        self={self}
                      />
                    </Grid>
                  )}
                </Grid>
              </div>
            </div>

            <div className='b-list-by-tags h-mt-32'>
              <div className='p-title'>
                <div>
                  {!state.isLoading && <FiberNewOutlined className='h-mr-20' />}

                  {state.isLoading ?
                    <Skeleton width={200} height={30} /> :
                    <Typography variant='h5' className='f-weight-700'>Mới cập nhật</Typography>
                  }
                </div>

                {!state.isLoading &&
                  <Button className='p-round-button' onClick={() => handleSearchAlls({ like: 'desc' })}>
                    <Typography className='f-weight-700'>Tất cả</Typography>
                  </Button>
                }
              </div>

              <div className='h-mt-32'>
                <Grid container spacing={3}>
                  {state.datasetValuesList.topDatasets.map((dataset, index) =>
                    <Grid item xs={3} key={index}>
                      <DatasetPost
                        datasetValues={dataset}
                        self={self}
                      />
                    </Grid>
                  )}
                </Grid>
              </div>
            </div>

            <div className='b-list-by-tags h-mt-32'>
              <div className='p-title'>
                <div>
                  {!state.isLoading && <StarsOutlined className='h-mr-20' />}
                  {state.isLoading ?
                    <Skeleton width={200} height={30} /> :
                    <Typography variant='h5' className='f-weight-700'>Gợi ý của bạn</Typography>
                  }
                </div>

                {!state.isLoading &&
                  <Button className='p-round-button' onClick={() => handleSearchAlls({ like: 'desc' })}>
                    <Typography className='f-weight-700'>Tất cả</Typography>
                  </Button>
                }
              </div>

              <div className='h-mt-32'>
                <Grid container spacing={3}>
                  {state.datasetValuesList.topDatasets.map((dataset, index) =>
                    <Grid item xs={3} key={index}>
                      <DatasetPost
                        datasetValues={dataset}
                        self={self}
                      />
                    </Grid>
                  )}
                </Grid>
              </div>
            </div>

            <div className='h-mt-32'>
              {state.isLoading ?
                <Skeleton width={300} height={30} /> :
                <Typography variant='h5' className='f-weight-700'>Top tags sử dụng nhiều</Typography>
              }
            </div>

            {console.log(state.datasetValuesList)}

            {state.datasetValuesList.tagsDatasets.map((tags, tagsIndex) =>
              <div className='b-list-by-tags h-mt-32' key={tagsIndex}>
                <div className='p-title'>
                  <div className='h-ml-8'>
                    {!state.isLoading && <TrendingUp />}
                    {state.isLoading ?
                      <Skeleton width="20%" height={20} /> :
                      <Typography variant='h5' className='f-weight-700 h-ml-20'>{tags.name}</Typography>
                    }
                  </div>
                  {!state.isLoading &&
                    <Button className='p-round-button' onClick={() => handleSearchAlls({ tags: [tags.name] })}>
                      <Typography className='f-weight-700'>Tất cả</Typography>
                    </Button>
                  }
                </div>

                <div className='h-mt-32'>
                  <Grid container spacing={3}>
                    {tags.datasets?.map((dataset, datasetsIndex) =>
                      <Grid item xs={3} key={datasetsIndex}>
                        <DatasetPost
                          datasetValues={dataset}
                          self={self}
                        />
                      </Grid>
                    )}
                  </Grid>
                </div>
              </div>
            )}

          </div>
        </div>
      </Container>
    </>
  )
}

