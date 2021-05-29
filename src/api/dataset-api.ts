import {
  CREATE_NEW_VERSION,
  DELETE_DATASET, DOWNLOAD_DATASET, GET_DATASET,
  LIKE_OR_UNLIKE_DATASET, SEARCH_DATASET, UPDATE_DATASET_DESCRIPTION,
  UPDATE_DATASET_TAGS, UPDATE_DATASET_TITLE_SUBTITLE, UPDATE_DATASET_VISIBILITY,
  UPLOAD_DATASET_IMAGE, UPLOAD_DATASET,
} from 'app/const/api-const/dataset-url.const';
import axios from 'axios';
import { createResult, requestAPI } from 'services/axios/handle-api.const';
import { fetchLogin } from 'redux/authentication-slice';
import store from 'store';
import addToast from 'dataworld/parts/toast/add-toast.component';
export interface DatasetValuesList {
  topDatasets: Array<DatasetValues>,
  newDatasets: Array<DatasetValues>,
  recommend: Array<DatasetValues>,
  tagsDatasets: Array<Tags>
}
export interface DatasetValues {
  avatar: string,
  name: string,
  email: string,
  username: string,
  accountId: string,
  dataset: Dataset,
}

export interface Dataset {
  _id: string,
  title: string,
  subtitle: string,
  url: string,
  size: number,
  description: string,
  visibility: number,
  path: string,
  downloads: number,
  views: number,
  files: Array<string>,
  fileTypes: Array<string>,
  like: Array<string>,
  countLike: number,
  tags: Array<Tags>,
  thumbnail: string,
  banner: string,
  versions: Array<Version>,
  createdDate: Date | string,
  lastUpdate: Date | string,
}

export interface Version {
  version: string,
  fileChanges: Array<FileVersion>,
  createdDate: Date | string | number,
}

export interface FileVersion {
  fileName: string,
  status: number,
  changeDetails: {
    add: any,
    remove: any
  },
}
export interface Tags {
  _id?: string,
  datasetsLength?: number,
  datasets?: Array<DatasetValues>,
  followers?: Array<any>,
  followersLength?: number,
  name: string,
  createdDate?: Date | string,
}

export interface QueryString {
  title?: string,
  like?: 'asc' | 'desc',
  tags?: Array<string>,
  fileType?: string,
  minSize?: string,
  maxSize?: string,
  date?: string,
}

export interface DatasetSearchList {
  countDatasets: number,
  datasets: Array<DatasetValues>
}

export const datasetDefaultValues: DatasetValues = {
  avatar: '',
  name: '',
  email: '',
  username: '',
  accountId: '',
  dataset: {
    _id: '',
    title: '',
    subtitle: '',
    url: '',
    size: 0,
    description: '',
    visibility: 0,
    path: '',
    downloads: 0,
    views: 0,
    banner: '',
    fileTypes: [],
    like: [],
    countLike: 0,
    files: [],
    tags: [],
    versions: [],
    thumbnail: '',
    createdDate: '',
    lastUpdate: '',
  }
}

export const tagsDefaultValues: Tags = {
  _id: '',
  datasetsLength: 0,
  datasets: Array(4).fill(datasetDefaultValues),
  name: '',
  createdDate: ''
}

export const searchListDefault: DatasetSearchList = {
  countDatasets: 0,
  datasets: Array(10).fill(datasetDefaultValues)
}

export default class DatasetAPI {
  /* Upload dataset */
  static uploadDataset = async (datasetFormData: FormData) => {
    try {
      const isLogin = await fetchLogin(store.dispatch)
      if (!isLogin) {
        addToast({ message: 'Phiên đăng nhập đã hết hạn, hãy đăng nhập lại', type: 'error' })
        window.location.href = '/auth/login'
      }
      const result = await axios.post(UPLOAD_DATASET.URL, datasetFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          "auth-token": localStorage.getItem("auth-token"),
        }
      })
      return createResult(result)
    } catch (error) {
      return createResult(null, error)
    }
  }

  /* Get data set info without file content */
  static getDataset = async (username: string, datasetUrl: string) => {
    GET_DATASET.URL = `dataset/${username}/${datasetUrl}`
    return await requestAPI<DatasetValues>(GET_DATASET)
  }

  /* update dataset description */
  static updateDescription = async (datasetId: string, description: string | undefined) => {
    const data = {
      datasetId: datasetId,
      description: description
    }
    return await requestAPI(UPDATE_DATASET_DESCRIPTION, data)
  }

  /* update dataset visibility */
  static updateVisibility = async (datasetId: string, visibility: number) => {
    const data = {
      datasetId: datasetId,
      visibility: visibility
    }
    return await requestAPI(UPDATE_DATASET_VISIBILITY, data)
  }

  /* update dataset title and subtitle */
  static updateTitleAndSubtitle = async (datasetId: string, title: string, subtitle: string) => {
    const data = {
      datasetId: datasetId,
      title: title,
      subTitle: subtitle
    }
    return await requestAPI(UPDATE_DATASET_TITLE_SUBTITLE, data)
  }

  /* update dataset banner, thumbnail */
  static uploadImage = async (thumbnailForm: FormData) => {
    try {
      const result = await axios.post(UPLOAD_DATASET_IMAGE.URL, thumbnailForm, {
        headers: {
          'Content-Type': 'multipart/form-data',
          "auth-token": localStorage.getItem("auth-token"),
        }
      })
      return createResult(result)
    } catch (error) {
      return createResult(null, error)
    }
  }

  /* update dataset tags */
  static updateTags = async (datasetId: string, oldTags: Array<Tags> | undefined, newTags: Array<Tags>) => {
    const data = {
      datasetId: datasetId,
      oldTags: oldTags,
      newTags: newTags,
    }
    return await requestAPI(UPDATE_DATASET_TAGS, data)
  }

  /* get trending dataset and tags dataset */
  static filterDataset = async (query: QueryString, page: number, limit: number) => {
    const data = {
      ...query,
      page: page,
      limit: limit
    }
    return await requestAPI<DatasetSearchList>(SEARCH_DATASET, data)
  }

  /* Like or unlike dataset */
  static likeOrUnLikeDataset = async (datasetId: string) => {
    const data = {
      datasetId: datasetId
    }
    return await requestAPI(LIKE_OR_UNLIKE_DATASET, data)
  }

  /* Download dataset by path */
  static downloadDatasetByPath = async (path: string, datasetId: string) => {
    const data = {
      pathDataset: path,
      datasetId: datasetId,
    }
    return await axios.request({
      method: 'POST',
      url: DOWNLOAD_DATASET.URL,
      headers: {
        "auth-token": localStorage.getItem("auth-token"),
      },
      data: data,
      responseType: 'arraybuffer',
    })
  }

  /* create new version */
  static createNewVersion = async (newVersionForm: FormData) => {
    try {
      const result = await axios.post(CREATE_NEW_VERSION.URL, newVersionForm, {
        headers: {
          'Content-Type': 'multipart/form-data',
          "auth-token": localStorage.getItem("auth-token"),
        }
      })
      return createResult(result)
    } catch (error) {
      return createResult(null, error)
    }
  }

  /* Delete dataset */
  static deleteDataset = async (datasetId: string) => {
    const data = {
      datasetId: datasetId
    }
    return await requestAPI(DELETE_DATASET, data)
  }
}