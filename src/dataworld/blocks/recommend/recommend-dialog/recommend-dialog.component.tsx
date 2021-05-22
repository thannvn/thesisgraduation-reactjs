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

  Typography
} from '@material-ui/core'
import { Close } from '@material-ui/icons'
import CommonAPI from 'api/common-api'
import { Tags } from 'api/dataset-api'
import SearchField from 'dataworld/parts/search-field/search-field.component'
import React, { useEffect, useState } from 'react'
import './recommend-dialog.scss'

interface RecommendModalProps {
  isOpen: boolean,
  onClose: () => void,
  onSubmit: () => void,
  currentRecommend: Array<Tags>,
}

export default function RecommendDialog(props: RecommendModalProps) {
  const { isOpen, onClose, onSubmit, currentRecommend } = props
  const [searchTags, setSearchTags] = useState<Array<Tags>>([])
  const [allTags, setAllTags] = useState<Array<Tags>>([])
  const [checkedTags, setCheckedTags] = useState<Array<Tags>>(currentRecommend)

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
    onSubmit()
    onClose()
  }


  useEffect(() => {
    const getTags = async () => {
      if (isOpen) {
        const result = await CommonAPI.getAllTags()
        console.log(result)
        setAllTags(result.data)
        setSearchTags(result.data)
      }
    }
    getTags()
  }, [isOpen])

  const LabelTags = (tags: Tags) => {
    return (
      <Typography>
        <span>{tags.name}</span>
      </Typography>
    )
  }

  return (
    <Dialog
      className='b-dialog-tags'
      open={isOpen}
      fullWidth={true}
      maxWidth='md'
    >
      <DialogTitle id="add-tags-title" className='b-title'>
        <IconButton onClick={onClose} className='p-icon-close'>
          <Close />
        </IconButton>

        <Typography variant='h6' className='f-weight-700'>Gợi ý của bạn</Typography>
      </DialogTitle>

      <DialogContent className='b-content'>
        <Grid container spacing={0}>
          <Grid item xs={5} className='b-select-tags'>
            <div className='p-search-bar'>
              <SearchField
                placeHolder='Tìm tags yêu thích...'
                onChange={handleSearch}
              />
            </div>

            <FormControl component="fieldset" className='p-select'>
              <Typography className='h-mb-8 f-weight-700'>Tags được yêu thích</Typography>

              <FormGroup className='h-ml-10'>
                {searchTags.map((tags, index) => (
                  <FormControlLabel
                    key={index}
                    control={
                      <Checkbox
                        className='h-mt-2'
                        checked={!isCheckedTag(tags.name)}
                        onChange={(event) => handleSelect(event)}
                        color='primary'
                        name={tags.name}
                      />
                    }
                    label={`$tags.name`}
                  />
                ))}
              </FormGroup>
            </FormControl>
          </Grid>

          <Grid item xs={7} className='b-input-tags'>
            <Typography></Typography>
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