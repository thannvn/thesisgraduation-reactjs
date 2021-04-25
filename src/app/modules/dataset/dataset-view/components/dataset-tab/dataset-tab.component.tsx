import {
  AppBar,
  Button,
  IconButton,
  Tab,
  Tabs
} from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';
import 'app/modules/dataset/dataset-view/css/dataset-tab.scss';
import { DatasetViewContext } from 'app/modules/dataset/dataset-view/pages/context.component';
import React, { useContext, useState } from 'react';
import HandleCommon from 'utils/handle-common';
import DataTab from '../data-tab/data-tab.component';
import SettingsTab from '../settings-tab/settings-tab.component';
import CommentTab from '../comment-tab/comment-tab.component'
import HistoryTab from '../history-tab/history-tab.component'
import DatasetAPI from 'api/dataset-api';

export interface TabProps {
  index: number;
  value: number;
}

export default function DatasetTab() {
  const { datasetValues, isLoadingData, countComment, ownerDataset } = useContext(DatasetViewContext)
  const [value, setValue] = useState<number>(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const downloadDataset = async () => {
    const path = datasetValues.dataset.path
    const result = await DatasetAPI.downloadDatasetByPath(path)
    let url = window.URL.createObjectURL(new Blob([result.data]));
    let link = document.createElement('a');
    link.href = url;
    link.download = `${datasetValues.dataset.title}.zip`;
    link.click();
  }

  return (
    <div>
      {!isLoadingData &&
        <>
          <AppBar position="static" className='b-dataset-tab'>
            <div className='b-tab'>
              <Tabs value={value} onChange={handleChange}>
                <Tab label="Data" id='data-tab' />
                <Tab label={`Bình luận (${countComment})`} />
                <Tab label='Lịch sử sửa đổi' id='history-tab' />
                {ownerDataset &&
                  <Tab label="Cài đặt" />
                }
              </Tabs>
              <div>
                <Button
                  variant='contained'
                  className='p-button-download h-mt-8 h-mb-8 h-mr-20'
                  onClick={downloadDataset}
                >
                  Tải về ({HandleCommon.formatBytes(datasetValues.dataset.size)})
                </Button>
                <IconButton className='h-mr-10' >
                  <MoreVert />
                </IconButton>
              </div>
            </div>
          </AppBar>
        </>
      }
      <DataTab value={value} index={0} />
      <CommentTab value={value} index={1} />
      <HistoryTab value={value} index={2} />
      {ownerDataset && <SettingsTab value={value} index={3} />}

    </div>
  )
}