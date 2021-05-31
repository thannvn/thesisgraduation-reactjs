import {
  Button,
  InputAdornment,
  TextField
} from '@material-ui/core';
import {
  FilterList, Search
} from '@material-ui/icons';
import { QueryString } from 'api/dataset-api';
import './search-bar.scss';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import queryString from 'query-string'
import FilterPopover from './filter-popover/filter-popover.component';
import { useHistory } from 'react-router';

interface SearchForm {
  title: string,
}


export default function SearchBar() {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const [filter, setFilter] = useState<QueryString>()
  const history = useHistory()
  const { register, handleSubmit, watch } = useForm<SearchForm>({
    defaultValues: {
      title: '',
    }
  })

  const openFilterPopover = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    setAnchorEl(event.currentTarget)
  }

  const onCloseFilterPopover = () => {
    setAnchorEl(null)
  }

  const getSeachString = () => {
    let search: QueryString = { ...filter }
    const title = watch('title')
    if (title) {
      search = { ...filter, title: title }
    }

    return queryString.stringify(search, { arrayFormat: 'index' })
  }

  const submitData = (data: SearchForm) => {
    const searchQueryString = getSeachString()
    history.push(`/dataset/search?${searchQueryString}`)
  }

  return (
    <>
      <form className='b-search-bar' onSubmit={handleSubmit(submitData)}>
        <TextField
          fullWidth
          inputRef={register}
          type='search'
          name='title'
          className='p-search-field h-mt-20'
          placeholder='Tìm kiếm...'
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Button
                  variant='outlined'
                  type='button'
                  onClick={openFilterPopover}
                  startIcon={<FilterList />}
                >
                  Bộ lọc
            </Button>
              </InputAdornment>
            )
          }}
          variant="outlined"
        />

        <Button
          variant='contained'
          type='submit'
          color='primary'
          disabled={!getSeachString()}
          className='p-button-search h-mt-20'
          startIcon={<Search />}
        />
      </form>

      <FilterPopover
        anchorEl={anchorEl}
        onClose={onCloseFilterPopover}
        applyFilter={setFilter}
      />
    </>
  )
}