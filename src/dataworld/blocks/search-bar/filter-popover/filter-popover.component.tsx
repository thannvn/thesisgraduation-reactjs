import {
  Button,
  InputAdornment,
  MenuItem,
  Popover,
  Select,
  TextField,
  Typography
} from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { Autocomplete, ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import CommonAPI from 'api/common-api';
import { QueryString, Tags } from 'api/dataset-api';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import './filter-popover.scss';

interface FilterPopoverProps {
  anchorEl: HTMLButtonElement | null,
  onClose: () => void,
  applyFilter: (filter: QueryString) => void
}

export interface FilterForm {
  minSize: number,
  maxSize: number,
  typeSizeMin: number,
  typeSizeMax: number
}

export default function FilterPopover({ anchorEl, onClose, applyFilter }: FilterPopoverProps) {
  const [fileType, setFileType] = useState<string>('');
  const [allTags, setAllTags] = useState<Array<Tags>>([])
  const [selectedTags, setSelectedTags] = useState<Array<Tags>>([])
  const defaultValues: FilterForm = {
    minSize: 0,
    maxSize: 0,
    typeSizeMin: 0,
    typeSizeMax: 0
  }
  const { register, errors, handleSubmit, control, reset, watch } =
    useForm<FilterForm>({ defaultValues: defaultValues })

  const handleSetFileType = (event: React.MouseEvent<HTMLElement>, newFileType: string) => {
    setFileType(newFileType);
  };

  const handleSelectTags = (newValue: any) => {
    setSelectedTags(newValue)
  }

  const handleApply = (data: FilterForm) => {
    reset(data)
    const { minSizeKB, maxSizeKB } = calculateMinSizeAndMaxSizeKB()
    let queryString: QueryString = {}

    if (selectedTags.length > 0) queryString.tags = selectedTags.map(tags => tags.name)
    if (fileType) queryString.fileType = fileType
    if (maxSizeKB !== 0 || minSizeKB !== 0) {
      queryString = {
        ...queryString,
        minSize: minSizeKB.toString(),
        maxSize: maxSizeKB.toString()
      }
    }

    applyFilter(queryString)
    onClose()
  }

  const calculateMinSizeAndMaxSizeKB = () => {
    return {
      minSizeKB: watch('minSize') * Math.pow(1024, watch('typeSizeMin')),
      maxSizeKB: watch('maxSize') * Math.pow(1024, watch('typeSizeMax'))
    }
  }

  const checkDisableButton = () => {
    const { minSizeKB, maxSizeKB } = calculateMinSizeAndMaxSizeKB()
    return (maxSizeKB === 0 && minSizeKB === 0)
  }

  const checkMaxBiggerThanMin = () => {
    const { minSizeKB, maxSizeKB } = calculateMinSizeAndMaxSizeKB()
    return (minSizeKB < maxSizeKB)
      || (maxSizeKB === 0 && minSizeKB === 0)
      || 'Max size phải lớn hơn min size'
  }

  useEffect(() => {
    const getTags = async () => {
      if (Boolean(anchorEl)) {
        const result = await CommonAPI.getAllTags()
        setAllTags(result.data)
      }
    }
    getTags()
  }, [anchorEl])

  return (
    <Popover
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      keepMounted
      className='b-filter-popover'
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    >
      <form onSubmit={handleSubmit(handleApply)}>
        <div className='b-content'>
          <div className='p-field-item'>
            <Typography>Tags</Typography>

            <Autocomplete
              multiple
              className='h-mt-6 p-search-tags'
              fullWidth
              value={selectedTags}
              size='small'
              onChange={(event, newValue) => handleSelectTags(newValue)}
              options={allTags ? allTags : []}
              getOptionLabel={(option) => option.name}
              renderInput={(params) =>
                <TextField
                  {...params}
                  placeholder="Tìm Tags.."
                  variant="outlined"
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                      <>
                        <InputAdornment position="start">
                          <Search />
                        </InputAdornment>
                        {params.InputProps.startAdornment}
                      </>
                    ),
                  }}
                />
              }
            />
          </div>

          <div className='p-field-item h-mt-20'>
            <Typography>Dung lượng</Typography>
            <div className='p-item h-mt-6'>
              <TextField
                variant='outlined'
                size='small'
                name='minSize'
                type='number'
                className='p-text-field'
                inputRef={register({ min: 0 })}
              />
              <Controller
                control={control}
                name='typeSizeMin'
                as={
                  <Select
                    variant='outlined'
                    className='p-select h-ml-10'
                  >
                    <MenuItem value={0}>Bytes</MenuItem>
                    <MenuItem value={1}>KB</MenuItem>
                    <MenuItem value={2}>MB</MenuItem>
                    <MenuItem value={3}>GB</MenuItem>
                  </Select>
                }
              />

              <Typography className='p-text h-ml-10 h-mr-10'>Đến</Typography>

              <TextField
                variant='outlined'
                name='maxSize'
                type='number'
                size='small'
                inputRef={register({ validate: checkMaxBiggerThanMin })}
                className='p-text-field'
              />

              <Controller
                control={control}
                name='typeSizeMax'
                as={
                  <Select
                    variant='outlined'
                    className='p-select h-ml-10'
                  >
                    <MenuItem value={0}>Bytes</MenuItem>
                    <MenuItem value={1}>KB</MenuItem>
                    <MenuItem value={2}>MB</MenuItem>
                    <MenuItem value={3}>GB</MenuItem>
                  </Select>
                }
              />
            </div>
            {errors.minSize &&
              <Typography className='p-validate-error'>Dung lượng không được nhỏ hơn 0</Typography>
            }

            {errors.maxSize &&
              <Typography className='p-validate-error'>{errors.maxSize.message}</Typography>
            }
          </div>

          <div className='p-field-item h-mt-20'>
            <Typography>Kiểu file</Typography>
            <ToggleButtonGroup
              value={fileType}
              className='h-mt-6'
              exclusive
              onChange={handleSetFileType}
            >
              <ToggleButton size='small' value="csv">
                CSV
            </ToggleButton>
              <ToggleButton size='small' value="json">
                JSON
            </ToggleButton>
            </ToggleButtonGroup>
          </div>
        </div>

        <div className='p-action'>
          <Button
            disabled={selectedTags.length === 0 && !fileType && checkDisableButton()}
            variant='contained'
            className='p-button-save-color'
            type='submit'
          >
            Áp dụng
          </Button>
        </div>
      </form>
    </Popover>
  )
}