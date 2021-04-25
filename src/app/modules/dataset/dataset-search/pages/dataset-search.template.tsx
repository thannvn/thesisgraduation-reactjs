import React from 'react';
import { Container, Typography } from '@material-ui/core';
import { FormatListNumbered } from '@material-ui/icons';
import { Pagination } from '@material-ui/lab';
import SearchBar from 'dataworld/blocks/search-bar/search-bar.component';
import DatasetItem from '../components/dataset-item/dataset-item.component';
import '../css/dataset-search.scss';
import DatasetSearch from './dataset-search.component';

export interface DatasetSearchProps {
  self: DatasetSearch
}

export default function DatasetSearchTemplate({ self }: DatasetSearchProps) {
  const { state, handleChangeCurrentPage } = self

  return (
    <Container component='main' className='h-mt-100 h-mb-100'>
      <div className='t-dataset-search'>
        <SearchBar />
        <div className='b-dataset-list'>
          <div className='p-title h-mt-32'>
            <FormatListNumbered />
            <Typography variant='h5' className='h-ml-10 f-weight-700'>
              {`${state.datasetValuesList.countDatasets} dataset được tìm thấy `}
            </Typography>
          </div>
          <ul style={{ listStyle: 'none', padding: '0px' }}>
            {state.datasetValuesList.datasets.map((item, index) => (
              <li
                className='b-item'
                key={index}
              >
                <DatasetItem 
                  self={self}
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