import { IconButton, Typography } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import {
  EditOutlined
} from '@material-ui/icons';
import { FileInfo } from 'api/file-api';
import Parser from 'html-react-parser';
import React, { useContext, useMemo, useState } from 'react';
import { DatasetViewContext } from '../../pages/context.component';
import EditFileDescription from '../edit-file-description/edit-file-description.component';
import 'app/modules/dataset/dataset-view/css/file-info-tab.scss';
import { Skeleton } from '@material-ui/lab';

interface ColumnTabProps {
  value: number,
  index: number,
  isLoadingFile: boolean,
  rowsData: Array<object>,
  fileInfo: FileInfo
}

export default function FileInfoTab({ rowsData, value, index, fileInfo, isLoadingFile }: ColumnTabProps) {
  const { ownerDataset } = useContext(DatasetViewContext)
  const [openFileDescription, setOpenFileDescription] = useState<boolean>(false)

  const handleOpenFileDescription = () => {
    setOpenFileDescription(true)
  }

  const handleCloseFileDescription = () => {
    setOpenFileDescription(false)
  }

  const rows = useMemo(
    () => (rowsData.map(
      (item, index) => ({ ...item, id: index }))
    ),
    [rowsData]
  );

  const columns = useMemo(
    () => (fileInfo.columns.map(
      item => ({ field: item.name, headerName: item.name, width: 130, description: item.description }))
    ),
    [fileInfo.columns]
  );

  return (
    <div className='b-column-tab' hidden={value !== index}>
      {isLoadingFile ?
        <Skeleton width='100%' height={200} /> :
        <div className='p-file-description'>
          {ownerDataset &&
            <>
              <IconButton className='p-edit-button' onClick={handleOpenFileDescription}>
                <EditOutlined />
              </IconButton>
              <EditFileDescription
                open={openFileDescription}
                key='edit-file'
                onClose={handleCloseFileDescription}
                fileInfo={fileInfo}
              />
            </>
          }
          <Typography className='h-mt-10 h-ml-20 f-weight-700'>Mô tả file</Typography>
          <div className='h-ml-20 '>
            {
              Parser(fileInfo.description ?
                fileInfo.description :
                `<p class='p-gray-color-typography'>Chưa có mô tả file</p>`
              )
            }
          </div>
        </div>
      }

      {isLoadingFile ?
        <Skeleton width='100%' height={700} /> :
        <div className='p-data-grid' key='datagrid'>
          <DataGrid rows={rows} columns={columns} hideFooterSelectedRowCount />
        </div>
      }
    </div>
  );
}