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
import {
  Close, FavoriteBorder
} from '@material-ui/icons'
import CommonAPI from 'api/common-api'
import { Tags } from 'api/dataset-api'
import ProfileAPI from 'api/profile-api'
import SearchField from 'dataworld/parts/search-field/search-field.component'
import addToast from 'dataworld/parts/toast/add-toast.component'
import React, { useEffect, useState } from 'react'
import { STATUS_OK } from 'services/axios/common-services.const'
import './recommend-dialog.scss'

interface RecommendModalProps {
  isOpen: boolean,
  onClose: () => void,
  onSubmit: () => void,
  currentRecommend: Array<Tags>,
}

interface LabelTagsProps {
  tags: Tags
}

const LabelTags = ({ tags }: LabelTagsProps) => {
  return (
    <div className='h-d_flex -align-center'>
      <Typography>{tags.name}</Typography>

      <Typography
        style={{ fontStyle: 'italic' }}
        variant='body2'
        className='p-gray-color-typography h-ml-4'
      >
        ({tags.followersLength} người theo dõi • {tags.datasetsLength} datasets )
      </Typography>
    </div>

  )
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

  const saveRecommendTags = async () => {
    const result = await ProfileAPI.updateRecommend(currentRecommend, checkedTags)
    if (result.status === STATUS_OK) {
      addToast({ message: result.message, type: 'success' })
      onSubmit()
      onClose()
    }
  }

  const disableButton = () => {
    const oldTags = currentRecommend
    const differentTags = checkedTags.filter(({ name: id1 }) => !oldTags.some(({ name: id2 }) => id2 === id1));
    if (differentTags.length > 0 || (differentTags.length === 0 && checkedTags.length < oldTags.length)) {
      return false
    }
    return true
  }

  const randomColor = () => {
    return Math.floor(Math.random() * 2) === 0 ? 'primary' : 'secondary'
  }


  useEffect(() => {
    const getTags = async () => {
      if (isOpen) {
        const result = await CommonAPI.getAllTags()
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
      maxWidth='md'
    >
      <DialogTitle id="add-tags-title" className='b-title'>
        <IconButton onClick={onClose} className='p-icon-close'>
          <Close />
        </IconButton>

        <Typography variant='h6' className='f-weight-700'>Danh sách yêu thích</Typography>
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
                        className='h-mt-2 h-mr-8'
                        checked={!isCheckedTag(tags.name)}
                        onChange={(event) => handleSelect(event)}
                        color='primary'
                        name={tags.name}
                      />
                    }
                    label={<LabelTags tags={tags} />}
                  />
                ))}
              </FormGroup>
            </FormControl>
          </Grid>

          <Grid item xs={7} className='b-input-tags'>
            <Typography className='h-mb-8 f-weight-700'>Danh sách của bạn</Typography>

            <ul className='p-display-list-tags'>
              {checkedTags.map((tags, index) => (
                <li key={index} className='h-mb-4'>
                  <Chip
                    label={tags.name}
                    color={randomColor()}
                    icon={<FavoriteBorder />}
                    variant='outlined'
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
          disabled={disableButton()}
        >
          Lưu
        </Button>
      </DialogActions>
    </Dialog>
  )
}