import DatasetAPI from 'api/dataset-api'
import FileAPI, { fileDefaultValues, FileInfo } from 'api/file-api'
import { STATUS_OK } from 'services/axios/common-services.const'
import { DatasetVisibility } from 'app/modules/dataset/_common/common.const'
import { DatasetViewContext } from 'app/modules/dataset/dataset-view/pages/context.component'
import addToast from 'dataworld/parts/toast/add-toast.component'
import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import queryString from 'query-string'
import { TabProps } from '../dataset-tab/dataset-tab.component'
import DataTabTemplate from './data-tab.template'


interface EasyUse {
  subtitle: boolean,
  tags: boolean,
  description: boolean,
  thumbnail: boolean,
  fileInfo: boolean,
}

export interface FileContentWithName {
  name: string,
  content: Array<object>
}

export interface DataTabState {
  isLoadingFile: boolean,
  isEdit: boolean,
  changeDescription: string,
  openTags: boolean,
  openConfirmVisibility: boolean,
  easyUse: EasyUse
  currentFileName: string,
  contents: Array<FileContentWithName>
  currentFile: CurrentFile
}

interface CurrentFile {
  info: FileInfo,
  content: FileContentWithName
}

const currentFile: CurrentFile = {
  info: { ...fileDefaultValues },
  content: {
    name: '',
    content: []
  }
}

export default function DataTab(props: TabProps) {
  const { value, index } = props
  const history = useHistory()
  const { datasetValues, setDatasetDescription, files,
    setVisibilityDataset } = useContext(DatasetViewContext)

  const [state, setState] = useState<DataTabState>({
    isLoadingFile: true,
    isEdit: false,
    changeDescription: '',
    openTags: false,
    openConfirmVisibility: false,
    easyUse: {
      subtitle: false,
      tags: false,
      description: false,
      thumbnail: false,
      fileInfo: false,
    },
    currentFileName: '',
    contents: [],
    currentFile: currentFile,
  })

  const handleOpenTags = async () => {
    setState({
      ...state,
      openTags: true,
    })
  };

  const handleCloseTags = () => {
    setState({
      ...state,
      openTags: false,
    })
  };


  const handleCloseConfirmVisibility = () => {
    setState({
      ...state,
      openConfirmVisibility: false
    })
  };

  const handleAcceptChangeVisibility = async () => {
    const visibility = datasetValues.dataset.visibility === DatasetVisibility.PRIVATE_DATASET ?
      DatasetVisibility.PUBLIC_DATASET : DatasetVisibility.PRIVATE_DATASET
    const result = await DatasetAPI.updateVisibility(datasetValues.dataset._id, visibility)
    if (result.status === STATUS_OK) {
      addToast({ message: result.message, type: "success" })
      setVisibilityDataset(visibility)
    } else {
      addToast({ message: result.message, type: "error" })
    }
  }

  const handleEdit = (event: React.MouseEvent<HTMLLabelElement, MouseEvent>) => {
    event.preventDefault()
    event.stopPropagation()
    setState({
      ...state,
      isEdit: !state.isEdit,
      changeDescription: datasetValues.dataset.description
    })
  }

  const handleSave = async (event: React.MouseEvent<HTMLLabelElement, MouseEvent>) => {
    event.preventDefault()
    event.stopPropagation()
    const result = await DatasetAPI.updateDescription(datasetValues.dataset._id, state.changeDescription)
    if (result.status === STATUS_OK) {
      addToast({ message: result.message, type: "success" })
      setDatasetDescription(state.changeDescription)
      setState({
        ...state,
        isEdit: false,
      })
    } else {
      addToast({ message: result.message, type: "error" })
    }
  }

  const changeVisibility = (event: React.MouseEvent<HTMLLabelElement, MouseEvent>) => {
    event.stopPropagation()
    setState({
      ...state,
      openConfirmVisibility: true
    })
  }

  const setChangeDescription = (change: string) => {
    setState({
      ...state,
      changeDescription: change
    })
  }

  const setCurrentFileAndContent = async (fileName: string) => {
    const info = files.filter(file => (file.name === fileName))[0]
    const index = state.contents.findIndex((file) => file.name === fileName)
    if (index === -1) {
      setState({
        ...state,
        isLoadingFile: true
      })
      const { path } = datasetValues.dataset
      const filePath = `${path}/files/${fileName}`
      const fileContent = await FileAPI.getOneFileInDataset(filePath)

      setState({
        ...state,
        isLoadingFile: false,
        currentFileName: fileName,
        contents: [
          ...state.contents,
          {
            name: fileName,
            content: fileContent.data
          }
        ],
        currentFile: {
          info: info,
          content: {
            name: fileName,
            content: fileContent.data
          }
        }
      })
    } else {
      const content = state.contents.filter(content => (content.name === fileName))[0]
      setState({
        ...state,
        currentFileName: fileName,
        currentFile: {
          info: info,
          content: content
        }
      })
    }
  }

  const handleClickTags = (tags: object) => {
    const searchString = queryString.stringify(tags, { arrayFormat: "index" })
    history.push(`/dataset/search?${searchString}`)
  }

  useEffect(() => {
    const getFileContent = async () => {
      const { path, description } = datasetValues.dataset
      const filePath = `${path}/files/${files[0].name}`
      const firstFileContent = await FileAPI.getOneFileInDataset(filePath)
      setState((state) => ({
        ...state,
        isLoading: false,
        changeDescription: description,
        currentFileName: files[0].name,
        isLoadingFile: false,
        contents: [{
          name: files[0].name,
          content: firstFileContent.data
        }],
        currentFile: {
          info: files[0],
          content: {
            name: files[0].name,
            content: firstFileContent.data
          }
        }
      }))
    }
    if (files.length !== 0) {
      getFileContent()
    }
  }, [files]) //eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const { description, subtitle, tags, thumbnail } = datasetValues.dataset
    let fileDescription: boolean = false
    for (let i = 0; i < files.length; ++i) {
      if (files[i].description !== '') {
        fileDescription = true
        break;
      }
    }
    setState((state) => ({
      ...state,
      easyUse: {
        description: description !== '',
        subtitle: subtitle !== '',
        fileInfo: fileDescription,
        tags: tags.length !== 0,
        thumbnail: thumbnail !== '',
      },
    }))
  }, [datasetValues.dataset, datasetValues.dataset.description, datasetValues.dataset.tags,
  datasetValues.dataset.subtitle, datasetValues.dataset.thumbnail, files])

  return (
    <DataTabTemplate
      state={state}
      value={value}
      index={index}
      handleCloseConfirmVisibility={handleCloseConfirmVisibility}
      handleAcceptChangeVisibility={handleAcceptChangeVisibility}
      changeVisibility={changeVisibility}
      handleEdit={handleEdit}
      handleCloseTags={handleCloseTags}
      handleClickTags={handleClickTags}
      handleOpenTags={handleOpenTags}
      handleSave={handleSave}
      setChangeDescription={setChangeDescription}
      setCurrentFileAndContent={setCurrentFileAndContent}
    />
  )
}