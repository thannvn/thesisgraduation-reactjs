import React from 'react';
import {
  Container
} from '@material-ui/core';
import DatasetHeader from '../components/dataset-header/dataset-header.component';
import 'app/modules/dataset/dataset-view/css/dataset-view.scss';
import DatasetTab from '../components/dataset-tab/dataset-tab.component';
import { DatasetViewProvider } from './context.component';


export default function DatasetViewTemplate() {
  return (
    <>
      <DatasetViewProvider>
        <Container component='main' className='h-mt-100 h-mb-100'>
          <div className='t-dataset-view'>
            <DatasetHeader />
            <DatasetTab />
          </div>
        </Container>
      </DatasetViewProvider>
    </>
  )
}

