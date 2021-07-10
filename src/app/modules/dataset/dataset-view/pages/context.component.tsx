import CommentAPI from "api/comment-api";
import DatasetAPI, { datasetDefaultValues, DatasetValues, Tags } from "api/dataset-api";
import FileAPI, { ColumnInfo, FileInfo } from 'api/file-api';
import { STATUS_OK } from "services/axios/common-services.const";
import { DatasetVisibility } from "app/modules/dataset/_common/common.const";
import addToast from "dataworld/parts/toast/add-toast.component";
import React, { createContext, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useRouteMatch } from "react-router";
import { RootState } from 'store';

interface ContextProps {
  datasetValues: DatasetValues,
  countComment: number,
  isLoadingData: boolean,
  ownerDataset: boolean,
  setDatasetDescription: (description: string) => void,
  handleChangeComment: (comment: boolean) => void,
  setDatasetTags: (tags: Array<Tags>) => void,
  setFileInfo: (fileId: string, columns: Array<ColumnInfo>, fileDescription: string) => void,
  setVisibilityDataset: (visibility: number) => void,
  files: Array<FileInfo>,
  setTitleAndSubtitle: (title: string, subtitle: string) => void,
  setBannerDataset: (banner: string) => void,
  setThumbnailDataset: (thumbnail: string) => void,
  handleChangeLike: (isLike: boolean) => void
}

interface RouteParams {
  username: string,
  datasetUrl: string,
}

interface DatasetViewState {
  isLoading: boolean,
  ownerDataset: boolean,
  countComment: number,
  datasetValues: DatasetValues,
  files: Array<FileInfo>
}


const DatasetViewContext = createContext<ContextProps>({
  datasetValues: { ...datasetDefaultValues },
  files: [],
  countComment: 0,
  isLoadingData: true,
  ownerDataset: false,
  setDatasetDescription: (description: string) => { },
  handleChangeComment: (comment: boolean) => { },
  setFileInfo: (fileId: string, columns: Array<ColumnInfo>, fileDescription: string) => { },
  setVisibilityDataset: (visibility: number) => { },
  setTitleAndSubtitle: (title: string, subtitle: string) => { },
  setBannerDataset: (banner: string) => { },
  setThumbnailDataset: (thumbnail: string) => { },
  setDatasetTags: (tags: Array<Tags>) => { },
  handleChangeLike: (isLike: boolean) => { },
});

const DatasetViewProvider = (props: any) => {
  const match = useRouteMatch<RouteParams>()
  const history = useHistory()
  const user = useSelector((state: RootState) => state.auth.user)
  const [state, setState] = useState<DatasetViewState>({
    isLoading: true,
    ownerDataset: false,
    countComment: 0,
    datasetValues: { ...datasetDefaultValues },
    files: [],
  });

  React.useEffect(() => {
    async function getDatasetValues() {
      const { datasetUrl, username } = match.params
      const dataset = await DatasetAPI.getDataset(username, datasetUrl)
      if (dataset.status !== STATUS_OK) {
        return history.push('/404')
      }
      if (user.accountId !== dataset.data.accountId
        && dataset.data.dataset.visibility === DatasetVisibility.PRIVATE_DATASET) {
        addToast({ message: "Không thể truy cập dataset cá nhân", type: "error" })
        history.push('/dataset')
      }
      document.title = dataset.data.dataset.title
      const result = await Promise.all([
        FileAPI.getAllFilesInfoInDataset(dataset.data.dataset._id),
        CommentAPI.countCommentInDataset(dataset.data.dataset._id)
      ])

      setState((state) => ({
        ...state,
        isLoading: false,
        countComment: result[1].data,
        ownerDataset: user.accountId === dataset.data?.accountId ? true : false,
        datasetValues: dataset.data,
        files: result[0].data.files
      }))
    }
    getDatasetValues()
  }, [history, match.params]) //eslint-disable-line react-hooks/exhaustive-deps


  const setDatasetDescription = (description: string) => {
    setState({
      ...state,
      datasetValues: {
        ...state.datasetValues,
        dataset: {
          ...state.datasetValues.dataset,
          description: description
        }
      }
    })
  }

  const setFileInfo = (fileId: string, columns: Array<ColumnInfo>, fileDescription: string) => {
    const index = state.files.findIndex(file => file._id === fileId)
    const newFiles = [...state.files]

    newFiles[index].description = fileDescription ? fileDescription : ''
    newFiles[index].columns = columns
    setState({
      ...state,
      files: newFiles
    })
  }

  const setVisibilityDataset = (visibility: number) => {
    setState({
      ...state,
      datasetValues: {
        ...state.datasetValues,
        dataset: {
          ...state.datasetValues.dataset,
          visibility: visibility
        }
      }
    })
  }

  const setTitleAndSubtitle = (title: string, subtitle: string) => {
    setState({
      ...state,
      datasetValues: {
        ...state.datasetValues,
        dataset: {
          ...state.datasetValues.dataset,
          title: title,
          subtitle: subtitle
        }
      }
    })
  }

  const setDatasetTags = (tags: Array<Tags>) => {
    setState({
      ...state,
      datasetValues: {
        ...state.datasetValues,
        dataset: {
          ...state.datasetValues.dataset,
          tags: tags
        }
      }
    })
  }

  const setBannerDataset = (banner: string) => {
    setState({
      ...state,
      datasetValues: {
        ...state.datasetValues,
        dataset: {
          ...state.datasetValues.dataset,
          banner: banner
        }
      }
    })
  }

  const setThumbnailDataset = (thumbnail: string) => {
    setState({
      ...state,
      datasetValues: {
        ...state.datasetValues,
        dataset: {
          ...state.datasetValues.dataset,
          thumbnail: thumbnail
        }
      }
    })
  }

  const handleChangeLike = (isLike: boolean) => {
    setState((prevState) => ({
      ...state,
      datasetValues: {
        ...state.datasetValues,
        dataset: {
          ...state.datasetValues.dataset,
          countLike: isLike ?
            prevState.datasetValues.dataset.countLike + 1 :
            prevState.datasetValues.dataset.countLike - 1,
          like: isLike ? [...prevState.datasetValues.dataset.like, user.accountId] :
            prevState.datasetValues.dataset.like.filter(id => id !== user.accountId)
        }
      }
    }))
  }

  const handleChangeComment = (comment: boolean) => {
    setState((prevState) => ({
      ...state,
      countComment: comment ? prevState.countComment + 1 : prevState.countComment - 1
    }))
  }

  return (
    <>
      <DatasetViewContext.Provider
        value={{
          datasetValues: state.datasetValues,
          isLoadingData: state.isLoading,
          countComment: state.countComment,
          ownerDataset: state.ownerDataset,
          setDatasetDescription: setDatasetDescription,
          handleChangeComment: handleChangeComment,
          setFileInfo: setFileInfo,
          setVisibilityDataset: setVisibilityDataset,
          setTitleAndSubtitle: setTitleAndSubtitle,
          setBannerDataset: setBannerDataset,
          setThumbnailDataset: setThumbnailDataset,
          setDatasetTags: setDatasetTags,
          handleChangeLike: handleChangeLike,
          files: state.files
        }}
      >
        {props.children}
      </DatasetViewContext.Provider>
    </>
  );
};

export { DatasetViewContext, DatasetViewProvider };

