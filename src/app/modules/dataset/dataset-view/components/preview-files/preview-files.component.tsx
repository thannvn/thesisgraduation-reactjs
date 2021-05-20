import {
  Grid,
  IconButton, Tab,
  Tabs,
  Tooltip,
  Typography
} from '@material-ui/core'
import {
  GetApp, InsertDriveFileOutlined
} from '@material-ui/icons'
import { Skeleton } from '@material-ui/lab'
import FileAPI from 'api/file-api'
import 'app/modules/dataset/dataset-view/css/preview-files.scss'
import { DatasetViewContext } from 'app/modules/dataset/dataset-view/pages/context.component'
import clsx from 'clsx'
import React, { useContext, useState } from 'react'
import HandleCommon from 'utils/handle-common'
import FileInfoTab from '../file-info-tab/file-info-tab.component'
import { DataTabState } from '../data-tab/data-tab.component'
import AnalysisTab from '../statistic-tab/statistic-tab.component'

interface PreviewFileProps {
  state: DataTabState,
  setCurrentFileAndContent: (fileName: string) => void
}

export default function PreviewFile(props: PreviewFileProps) {
  const { setCurrentFileAndContent, state } = props
  const { files, datasetValues, isLoadingData } = useContext(DatasetViewContext)
  const [value, setValue] = useState<number>(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const selectFile = (fileName: string) => {
    setCurrentFileAndContent(fileName)
  }

  const downloadFile = async () => {
    const { path } = state.currentFile.info
    const { _id } = datasetValues.dataset
    const result = await FileAPI.downloadFileByPath(path, _id)
    let url = window.URL.createObjectURL(result.data);
    let link = document.createElement('a');
    link.href = url;
    link.download = state.currentFile.info.name;
    link.click();
  }

  return (
    <div className='b-preview-files h-mt-32'>
      <Grid container spacing={0}>
        <Grid item xs={3} className='b-select-file'>
          <div className='b-files'>
            {!isLoadingData && <Typography variant='h6'>Thông tin files</Typography>}
            {isLoadingData ?
              <Skeleton width={70} /> :
              <Typography className='p-gray-color-typography'>
                {HandleCommon.formatBytes(datasetValues.dataset.size)}
              </Typography>
            }

            {isLoadingData ?
              <Skeleton width={120} /> :
              <>
                {files?.map((file, index) => (
                  <div className='p-file-info h-mt-10' key={index}>
                    <InsertDriveFileOutlined color='action' />
                    <Tooltip title={file.name}>
                      <button
                        className={clsx({ 'p-file-name': file.name === state.currentFileName },
                          { 'p-button-span h-ml-4': true })}
                        onClick={() => selectFile(file.name)}
                      >
                        {file.name}
                      </button>
                    </Tooltip>

                  </div>
                ))}
              </>
            }

          </div>
        </Grid>
        <Grid item xs={9}>
          <div className='b-preview h-ml-20 h-mr-20'>
            <div className='p-title-file h-ml-32 h-mt-12'>
              {state.isLoadingFile ?
                <Skeleton width={500} /> :
                <>
                  <Typography variant='h6'>{state.currentFile?.info.name}</Typography>
                  <Typography variant='h6' className='h-ml-4 p-gray-color-typography'>
                    ({HandleCommon.formatBytes(state.currentFile.info.size)})
                  </Typography>
                </>
              }

              {!state.isLoadingFile &&
                <div className='p-option h-mt-4'>
                  <IconButton onClick={downloadFile}>
                    <GetApp color='action' />
                  </IconButton>
                </div>
              }
            </div>

            {!state.isLoadingFile &&
              <div className='p-preview-tab h-mt-12'>
                <Tabs value={value} onChange={handleChange}>
                  <Tab label="Thông tin" id='column' />

                  <Tab label="Thống kê" id='statistic' />
                </Tabs>
              </div>
            }

            <FileInfoTab
              value={value}
              index={0}
              rowsData={state.currentFile.content.content}
              fileInfo={state.currentFile.info}
              isLoadingFile={state.isLoadingFile}
            />

            <AnalysisTab
              value={value}
              index={1}
              columns={state.currentFile.info.columns}
            />
          </div>
        </Grid>
      </Grid>
    </div>
  )
}