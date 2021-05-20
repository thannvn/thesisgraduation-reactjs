import React from 'react';
import {
  Container
} from '@material-ui/core';
import DatasetHeader from '../components/dataset-header/dataset-header.component';
import 'app/modules/dataset/dataset-view/css/dataset-view.scss';
import DatasetTab from '../components/dataset-tab/dataset-tab.component';
import { DatasetViewProvider } from './context.component';
import Footer from 'dataworld/blocks/footer/footer.component';
import RecommendList from 'dataworld/blocks/recommend/recommend-list/recommend-list.component';


export default function DatasetViewTemplate() {
  return (
    <>
      <DatasetViewProvider>
        <Container
          style={{ maxWidth: '100%', padding: '100px' }}
        >
          <div className='h-d_flex t-dataset-view h-mb-60'>
            <div className='t-dataset-content'>
              <DatasetHeader />

              <DatasetTab />
            </div>

            <div className='t-dataset-recommend h-ml-20'>
              <RecommendList />
            </div>
          </div>

          <Footer />
        </Container>
      </DatasetViewProvider>
    </>
  )
}