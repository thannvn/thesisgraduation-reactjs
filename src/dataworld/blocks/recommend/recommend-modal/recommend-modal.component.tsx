import {
  Button,
  Checkbox,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  TextField,
  Typography
} from '@material-ui/core'
import { Close } from '@material-ui/icons'
import DatasetAPI, { Tags } from 'api/dataset-api'
import SearchField from 'dataworld/parts/search-field/search-field.component'
import React, { useEffect, useState } from 'react'

interface RecommendModal {
  isOpen: boolean,
  onClose: () => void,
}

export default function RecommendModal({ isOpen, onClose }: RecommendModal) {
  const [searchTags, setSearchTags] = useState<Array<Tags>>([])
  const [allTags, setAllTags] = useState<Array<Tags> | undefined>(undefined)
  const [checkedTags, setCheckedTags] = useState<Array<Tags>>([])
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (allTags) {
      setSearchTags(allTags.filter(tags => tags.name.includes(event.target.value)))
    }
  }

  const isCheckedTag = (newTags: string) => {
    return checkedTags.findIndex(tags => tags.name === newTags) < 0
  }

  const handleSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = event.target
    let newState: Array<Tags> = [];
    if (isCheckedTag(name)) {
      newState = [...checkedTags, { name: name }];
    } else {
      newState = checkedTags.filter(tags => tags.name !== name);
    }
    setCheckedTags(newState)
  }

  const handleDelete = (tagsDelete: Tags) => () => {
    setCheckedTags(checkedTags.filter((tags) => tags.name !== tagsDelete.name));
  };

  const saveRecommendTags = () => {

  }


  useEffect(() => {
    const getTags = async () => {
      if (isOpen) {
        const result = await DatasetAPI.getAllTags()
        setAllTags(result.data)
        setSearchTags(result.data)
      }
    }
    getTags()
  }, [isOpen])

  return (
    <Dialog
      className='b-dialog-tags'
      open={isOpen}
      fullWidth={true}
      maxWidth='sm'
    >
      <DialogTitle id="add-tags-title" className='b-title'>
        <IconButton onClick={onClose} className='p-icon-close'>
          <Close />
        </IconButton>

        <Typography variant='h6' className='f-weight-700'>Cập nhật tags</Typography>
      </DialogTitle>

      <DialogContent className='b-content'>
        <Grid container spacing={0}>
          <Grid item xs={6} className='b-select-tags'>
            <div className='p-search-bar'>
              <SearchField
                placeHolder='Tìm tags yêu thích...'
                onChange={handleSearch}
              />

            </div>

            <FormControl component="fieldset" className='p-select'>
              <Typography className='h-mb-10 f-weight-700'>Tags hay dùng</Typography>

              <FormGroup>
                {searchTags.map((tags, index) => (
                  <FormControlLabel
                    key={index}
                    control={
                      <Checkbox
                        className='h-mr-16'
                        checked={!isCheckedTag(tags.name)}
                        onChange={(event) => handleSelect(event)}
                        color='primary'
                        name={tags.name}
                      />
                    }
                    label={tags.name}
                  />
                ))}
              </FormGroup>
            </FormControl>
          </Grid>

          <Grid item xs={6} className='b-input-tags'>
            <ul className='p-display-list-tags'>
              {checkedTags.map((tags, index) => (
                <li key={index} className='h-mb-4'>
                  <Chip
                    label={tags.name}
                    onDelete={handleDelete(tags)} />
                </li>
              ))}
            </ul>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions className='b-actions'>
        <Button
          className='p-round-button p-button-save-color'
          onClick={saveRecommendTags}
        >
          Lưu
        </Button>
      </DialogActions>
    </Dialog>
  )
}