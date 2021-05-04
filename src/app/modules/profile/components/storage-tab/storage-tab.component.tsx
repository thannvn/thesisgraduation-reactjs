import { Button, IconButton, Menu, MenuItem, TextField, Typography, withStyles } from '@material-ui/core';
import {
  ArrowDropDown,
  Close, PostAddOutlined
} from '@material-ui/icons';
import { DatasetValues } from 'api/dataset-api';
import 'app/modules/profile/css/storage-tab.scss';
import { ProfileProps } from 'app/modules/profile/pages/profile.template';
import DatasetItem from 'dataworld/blocks/dataset-item/dataset-item.component';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props: any) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
));

interface StorageTabProps extends ProfileProps {
  index: number,
  value: number,
}

const menuDisplay = [
  { label: 'Tất cả', value: 0 },
  { label: 'Cộng đồng', value: 1 },
  { label: 'Cá nhân', value: 2 },
]

const menuFileType = [
  { label: 'Tất cả', value: 0 },
  { label: 'CSV', value: 1 },
  { label: 'JSON', value: 2 },
]

const menuSort = [
  { label: 'Ngày cập nhật', value: 0 },
  { label: 'Lượt thích', value: 1 },
]

export default function StorageTab({
  index,
  value,
  self
}: StorageTabProps) {
  const { state, handleChangeLike } = self
  const history = useHistory()
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const [popoverId, setPopoverId] = useState<number>(0)
  const [datasetsFilter, setDatasetsFilter] = useState<Array<DatasetValues>>(state.userInfo.datasets)

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setDatasetsFilter(state.userInfo.datasets.filter(dataset =>
      dataset.dataset.title.trim().toLowerCase().includes(event.target.value.trim())
    ))
  }

  const handleCreate = () => {
    history.push('/dataset/create')
  }

  const handlePopover = (id: number, event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null) => {
    setPopoverId(id)
    setAnchorEl(event ? event.currentTarget : null)
  }

  const isOpen = (id: number) => {
    return Boolean(id === popoverId) && Boolean(anchorEl)
  }

  useEffect(() => {
    setDatasetsFilter(state.userInfo.datasets)
  }, [state.userInfo.datasets])

  return (
    <div hidden={value !== index} className='b-storage-tab'>
      <div className='b-dataset-filter'>
        <TextField
          type="search"
          style={{ width: '41.5%' }}
          onChange={(event) => handleSearch(event)}
          placeholder='Tìm kiếm dataset...'
          variant="outlined"
          size="small"
        />

        <Button
          variant='contained'
          className='h-ml-40 background-gray '
          endIcon={<ArrowDropDown />}
          onClick={(event) => handlePopover(0, event)}
          size='small'
        >
          Hiển thị
        </Button>

        <StyledMenu
          id='menu-display'
          className='h-mt-40'
          anchorEl={anchorEl}
          keepMounted
          open={isOpen(0)}
          onClose={() => handlePopover(0, null)}
        >
          <div
            className='h-d_flex -align-center -justify-space-between p-title-filter'
          >
            <Typography className='f-weight-700'>Chọn chế độ hiển thị</Typography>

            <IconButton onClick={() => handlePopover(0, null)}>
              <Close color='action' fontSize='small' />
            </IconButton>
          </div>

          {menuDisplay.map((item, index) =>
            <MenuItem
              className='-top-line'
              key={index}
            >
              {item.label}
            </MenuItem>
          )}
        </StyledMenu>

        <Button
          variant='contained'
          className='h-ml-10 background-gray'
          onClick={(event) => handlePopover(1, event)}
          endIcon={<ArrowDropDown />}
          size='small'
        >
          Kiểu file
        </Button>

        <StyledMenu
          id='file-type'
          className='h-mt-40'
          anchorEl={anchorEl}
          keepMounted
          open={isOpen(1)}
          onClose={() => handlePopover(1, null)}
        >
          <div
            className='h-d_flex -align-center -justify-space-between p-title-filter'
          >
            <Typography className='f-weight-700'>Chọn kiểu file</Typography>

            <IconButton onClick={() => handlePopover(1, null)}>
              <Close color='action' fontSize='small' />
            </IconButton>
          </div>

          {menuFileType.map((item, index) =>
            <MenuItem
              className='-top-line'
              key={index}
            >
              {item.label}
            </MenuItem>
          )}
        </StyledMenu>

        <Button
          variant='contained'
          className='h-ml-10 background-gray'
          endIcon={<ArrowDropDown />}
          onClick={(event) => handlePopover(2, event)}
          size='small'
        >
          Sắp xếp
        </Button>

        <StyledMenu
          id='file-type'
          className='h-mt-40'
          anchorEl={anchorEl}
          keepMounted
          open={isOpen(2)}
          onClose={() => handlePopover(2, null)}
        >
          <div
            className='h-d_flex -align-center -justify-space-between p-title-filter'
          >
            <Typography className='f-weight-700'>Chọn kiểu sắp xếp</Typography>

            <IconButton onClick={() => handlePopover(2, null)}>
              <Close color='action' fontSize='small' />
            </IconButton>
          </div>

          {menuSort.map((item, index) =>
            <MenuItem
              className='-top-line'
              key={index}
            >
              {item.label}
            </MenuItem>
          )}
        </StyledMenu>

        <Button
          variant='contained'
          className='h-ml-20'
          onClick={handleCreate}
          color='primary'
          startIcon={<PostAddOutlined />}
          size='small'
        >
          Tạo mới
        </Button>

      </div>

      <div className='b-dataset-list'>
        <ul className='b-list'>
          {datasetsFilter.map((dataset, index) => (
            <li
              className='b-item'
              key={index}
            >
              <DatasetItem
                isLoading={state.isLoading}
                handleChangeLike={handleChangeLike}
                datasetValues={dataset}
                isHiddenDatasetVisibility={false}
                position={index}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}