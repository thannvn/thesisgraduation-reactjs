import React from 'react';
import { Container, Typography } from '@material-ui/core';
import { FormatListNumbered } from '@material-ui/icons';
import { Pagination } from '@material-ui/lab';
import SearchBar from 'dataworld/blocks/search-bar/search-bar.component';
import DatasetItem from 'dataworld/blocks/dataset-item/dataset-item.component';
import '../css/dataset-search.scss';
import DatasetSearch from './dataset-search.component';

export interface DatasetSearchProps {
  self: DatasetSearch
}

export default function DatasetSearchTemplate({ self }: DatasetSearchProps) {
  const { state, handleChangeCurrentPage, handleChangeLike } = self

  return (
    <Container component='main' className='h-mt-100 h-mb-100'>
      <div className='t-dataset-search'>
        <div className='b-header'>
          <Typography
            variant='h4'
            className='f-weight-700'
          >
            Tìm kiếm
          </Typography>
        </div>

        <SearchBar />

        <div className='b-dataset-list'>
          <div className='p-title h-mt-32 -bottom-line'>
            <FormatListNumbered />
            <Typography variant='h5' className='h-ml-10 f-weight-700'>
              {`${state.datasetValuesList.countDatasets} dataset được tìm thấy `}
            </Typography>
          </div>

          <ul className='b-list'>
            {state.datasetValuesList.datasets.map((item, index) => (
              <li
                className='b-item'
                key={index}
              >
                <DatasetItem
                  handleChangeLike={handleChangeLike}
                  isLoading={state.isLoading}
                  datasetValues={item}
                  position={index}
                />
              </li>
            ))}
          </ul>
        </div>

        {!state.isLoading &&
          <Pagination
            count={Math.ceil(state.datasetValuesList.countDatasets / state.limit)}
            page={state.currentPage}
            color='primary'
            className='h-mt-32'
            variant="outlined"
            onChange={handleChangeCurrentPage}
          />
        }
      </div>
    </Container>
  )
}