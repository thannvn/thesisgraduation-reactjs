import React, { useContext, useEffect, useState } from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography
} from '@material-ui/core'
import {
  Close
} from '@material-ui/icons'
import FileAPI, { ColumnInfo, FileInfo } from 'api/file-api'
import TinyMCEEditor from 'dataworld/blocks/tinymce-editor/tinymce-editor.component'
import { useForm } from 'react-hook-form'
import MenuTypeColumn from '../menu-type-column/menu-type-column.component'
import { DatasetViewContext } from '../../pages/context.component'
import addToast from 'dataworld/parts/toast/add-toast.component'
import { STATUS_OK } from 'services/axios/common-services.const'
import 'app/modules/dataset/dataset-view/css/edit-file-description.scss'

interface EditFileDescriptionProps {
  fileInfo: FileInfo,
  open: boolean,
  onClose: () => void,
}

export default function EditFileDescription(props: EditFileDescriptionProps) {
  const { open, onClose, fileInfo } = props
  const { handleSubmit, register } = useForm()
  const { setFileInfo, datasetValues } = useContext(DatasetViewContext)
  const [columnsType, setColumnsType] = useState<Array<number>>([])
  const [fileDescription, setFileDescription] = useState(fileInfo.description)

  const onSubmit = async (data: any) => {
    const newColumns = fileInfo.columns.map((column, index): ColumnInfo => ({
      name: column.name,
      analysis: column.analysis,
      description: data[column.name],
      type: columnsType[index],
    }))
    const result = await Promise.all([
      fileDescription !== fileInfo.description ?
        FileAPI.updateFileDescription(datasetValues.dataset._id, fileInfo._id, fileDescription) :
        null,
      FileAPI.updateFileColumns(datasetValues.dataset._id, fileInfo._id,
        newColumns, `${datasetValues.dataset.path}/files/${fileInfo.name}`)
    ])

    if (result[1].status === STATUS_OK) {
      addToast({ message: result[1].message, type: "success" })
      setFileInfo(fileInfo._id, result[1].data, fileInfo.description)
      onClose()
    } else {
      addToast({ message: result[1].message, type: "error" })
    }
  }

  const handleClose = () => {
    setColumnsType(fileInfo.columns.map(column => column.type))
    onClose()
  }

  useEffect(() => {
    setColumnsType(fileInfo.columns.map(column => column.type))
  }, [fileInfo.columns])

  return (
    <Dialog
      className='b-edit-file-description'
      open={open}
      fullWidth={true}
      maxWidth='md'>
      <DialogTitle id="add-tags-title" className='b-title'>
        <IconButton onClick={handleClose} className='p-icon-close'>
          <Close />
        </IconButton>
        <Typography variant='h6' className='f-weight-700'>Chỉnh sửa file</Typography>
      </DialogTitle>

      <form className='b-form' onSubmit={handleSubmit(onSubmit)} >
        <DialogContent>
          <Typography className='f-weight-700 h-mb-10'>Mô tả file</Typography>
          <TinyMCEEditor
            values={fileDescription}
            setValues={setFileDescription}
            height={200}
          />
        </DialogContent>

        <div className='b-columns-description h-mt-20'>
          {fileInfo.columns.map((column, index) =>
            <MenuTypeColumn
              key={index}
              columnInfo={column}
              register={register}
              columnsType={columnsType}
              indexColumn={index}
              setColumnsType={setColumnsType}
            />)
          }
        </div>


        <DialogActions className='b-actions'>
          <Button
            variant='outlined'
            size='small'
            className='p-round-button'
            type='button'
            onClick={handleClose}
          >
            Hủy
          </Button>
          <Button
            size='small'
            variant='contained'
            className='p-round-button p-button-save-color'
            type='submit'
          >
            Lưu
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}