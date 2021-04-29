import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  FormControlLabel,
  Grid,
  IconButton,
  Typography
} from '@material-ui/core'
import {
  Check,
  Close,
  Edit,
  ExpandMore,
  LocalOffer
} from '@material-ui/icons'
import { Skeleton } from '@material-ui/lab'
import { DatasetVisibility } from 'app/modules/dataset/_common/common.const'
import 'app/modules/dataset/dataset-view/css/data-tab.scss'
import { DatasetViewContext } from 'app/modules/dataset/dataset-view/pages/context.component'
import clsx from 'clsx'
import AlertDialog from 'dataworld/blocks/alert-dialog/alert-dialog.component'
import TinyMCEEditor from 'dataworld/blocks/tinymce-editor/tinymce-editor.component'
import Parser from 'html-react-parser'
import React, { useContext } from 'react'
import PreviewFile from '../preview-files/preview-files.component'
import TagsDialog from '../tags-dialog/tags-dialog.component'
import { DataTabState } from './data-tab.component'


interface DataTabTemplateProps {
  state: DataTabState,
  value: number,
  index: number,
  handleOpenTags: () => void,
  handleCloseTags: () => void,
  handleCloseConfirmVisibility: () => void,
  handleAcceptChangeVisibility: () => void,
  handleEdit: (event: React.MouseEvent<HTMLLabelElement, MouseEvent>) => void,
  handleSave: (event: React.MouseEvent<HTMLLabelElement, MouseEvent>) => void,
  changeVisibility: (event: React.MouseEvent<HTMLLabelElement, MouseEvent>) => void,
  setChangeDescription: (change: string) => void,
  setCurrentFileAndContent: (fileName: string) => void,
  handleClickTags: (tags: object) => void
}

export default function DataTabTemplate(props: DataTabTemplateProps) {
  const { state, value, index, changeVisibility, handleCloseConfirmVisibility,
    handleOpenTags, handleCloseTags, handleSave, handleEdit, handleClickTags,
    setChangeDescription, setCurrentFileAndContent, handleAcceptChangeVisibility } = props

  const { datasetValues, ownerDataset, isLoadingData } = useContext(DatasetViewContext)

  return (
    <>
      <div
        id='data-tab'
        hidden={value !== index}
        className='t-data-tab h-mt-32'>

        <div className='b-info'>
          <div className='p-icon-text h-ml-20'>
            {!isLoadingData &&
              <>
                <LocalOffer />
                <Typography>Tags: </Typography>
              </>
            }
            {isLoadingData ?
              <Skeleton width={500} height={50} /> :
              <div className='h-ml-10' style={{ display: 'flex' }}>
                {datasetValues.dataset.tags.map((item, index) => (
                  < Typography
                    className='h-ml-2 p-text'
                    onClick={() => handleClickTags({ tags: [item.name] })}
                    key={index}
                  >
                    {index !== datasetValues.dataset.tags.length - 1 ? `${item.name}, ` : item.name}
                  </Typography>
                ))}
              </div>

            }
          </div>


          {ownerDataset &&
            <div className='p-icon-text h-mr-10'>
              {isLoadingData ?
                <Skeleton width={120} height={50} /> :
                <>
                  <Button
                    variant="outlined"
                    startIcon={<Edit />}
                    onClick={handleOpenTags}>
                    Chỉnh sửa
                  </Button>
                  <TagsDialog
                    open={state.openTags}
                    onClose={handleCloseTags}
                  />
                </>
              }
            </div>
          }
        </div>

        {ownerDataset &&
          <div className='b-dataset-info h-mt-32'>
            {isLoadingData ?
              <Skeleton width='100%' height={90} /> :
              <Accordion>
                <AccordionSummary
                  className='p-summary'
                  id='make-easy'
                >
                  <ExpandMore className='h-mr-10' />
                  <Typography>Thông tin về dataset</Typography>
                  <FormControlLabel
                    label=''
                    className='h-ml-20'
                    onClick={(event) => changeVisibility(event)}
                    control={
                      <Button
                        type='button'
                        variant='outlined'
                        color='primary'
                        className='p-button-visibility'
                      >
                        {datasetValues.dataset.visibility === DatasetVisibility.PRIVATE_DATASET ? 'Public' : 'Private'}
                      </Button>
                    }
                  />
                  <AlertDialog
                    open={state.openConfirmVisibility}
                    onClose={handleCloseConfirmVisibility}
                    onAccept={handleAcceptChangeVisibility}
                    title='Chuyển Dataset sang public?'
                    content='Dataset ở chế độ public, tất cả người dùng trong cộng đồng Data World đều có thể truy cập.'
                  />

                </AccordionSummary>
                <AccordionDetails className='p-detail-info h-ml-4'>
                  <Grid container spacing={3}>
                    <Grid item xs={6}>
                      <Typography variant='h6'>Thêm thông tin về dataset</Typography>
                      <div className='p-info'>
                        {state.easyUse.subtitle ? <Check fontSize='small' /> : <Close fontSize='small' />}
                        <Typography
                          className={clsx({ 'p-gray-color-typography': state.easyUse.subtitle },
                            { 'h-ml-4': true }, { 'p-blue-color': !state.easyUse.subtitle })}
                        >
                          Thêm subtitle
                        </Typography>
                      </div>

                      <div className='p-info'>
                        {state.easyUse.tags ? <Check fontSize='small' /> : <Close fontSize='small' />}
                        <Typography
                          className={clsx({ 'p-gray-color-typography': state.easyUse.tags },
                            { 'h-ml-4': true }, { 'p-blue-color': !state.easyUse.tags })}
                        >
                          Thêm tags
                        </Typography>
                      </div>

                      <div className='p-info'>
                        {state.easyUse.description ? <Check fontSize='small' /> : <Close fontSize='small' />}
                        <Typography
                          className={clsx({ 'p-gray-color-typography': state.easyUse.description },
                            { 'h-ml-4': true }, { 'p-blue-color': !state.easyUse.description })}
                        >
                          Thêm mô tả về dataset
                        </Typography>
                      </div>

                      <div className='p-info'>
                        {state.easyUse.thumbnail ? <Check fontSize='small' /> : <Close fontSize='small' />}
                        <Typography
                          className={clsx({ 'p-gray-color-typography': state.easyUse.thumbnail },
                            { 'h-ml-4': true }, { 'p-blue-color': !state.easyUse.thumbnail })}
                        >
                          Thêm thumnail
                        </Typography>
                      </div>
                    </Grid>

                    <Grid item xs={6}>
                      <Typography variant='h6'>Thêm thông tin về file trong dataset</Typography>
                      <div className='p-info'>
                        {state.easyUse.fileInfo ? <Check fontSize='small' /> : <Close fontSize='small' />}
                        <Typography
                          className={clsx({ 'p-gray-color-typography': state.easyUse.fileInfo },
                            { 'h-ml-4': true }, { 'p-blue-color': !state.easyUse.fileInfo })}
                        >
                          Thêm mô tả ít nhất 1 file
                        </Typography>
                      </div>
                    </Grid>
                  </Grid>

                </AccordionDetails>
              </Accordion>
            }
          </div>
        }

        {isLoadingData ?
          <Skeleton width='100%' height={90} /> :
          <div className='b-description h-mt-32'>
            <Accordion>
              <AccordionSummary
                className='p-summary'
                expandIcon={<ExpandMore />}
                id='description'
              >

                <Typography >Mô tả Dataset</Typography>
                {ownerDataset &&
                  <>
                    {state.isEdit ?
                      <>
                        <FormControlLabel
                          label=''
                          className='h-ml-20'
                          onClick={(event) => handleSave(event)}
                          control={
                            <button
                              className='p-button-edit p-btn-save'
                              disabled={state.changeDescription === datasetValues.dataset.description}
                            >
                              Lưu
                            </button>
                          }
                        />
                        <FormControlLabel
                          label=''
                          onClick={(event) => handleEdit(event)}
                          control={
                            <button className='p-button-edit p-btn-cancel'>Hủy</button>
                          }
                        />
                      </>
                      :
                      <FormControlLabel
                        label=''
                        className='h-ml-20'
                        onClick={(event) => handleEdit(event)}
                        control={
                          <IconButton >
                            <Edit />
                          </IconButton>
                        }
                      />
                    }
                  </>
                }
              </AccordionSummary>
              <AccordionDetails className='b-details'>
                {
                  Parser(datasetValues.dataset.description ?
                    datasetValues.dataset.description :
                    `<p class='p-gray-color-typography'>Chưa có mô tả file</p>`)
                }
              </AccordionDetails>
            </Accordion>
          </div>
        }

        {state.isEdit && ownerDataset &&
          <div className='h-mt-32'>
            <TinyMCEEditor
              values={state.changeDescription}
              setValues={setChangeDescription}
              height={300} />
          </div>
        }

        <PreviewFile setCurrentFileAndContent={setCurrentFileAndContent} state={state} />
      </div>
    </>

  )
}