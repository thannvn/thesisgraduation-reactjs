import {
  DOWNLOAD_DATASET, GET_ALL_TAGS_DATASET, GET_DATASET,
  GET_TRENDING_DATASET_TAGS,
  LIKE_OR_UNLIKE_DATASET, SEARCH_DATASET, UPDATE_DATASET_DESCRIPTION,
  UPDATE_DATASET_TAGS, UPDATE_DATASET_TITLE_SUBTITLE, UPDATE_DATASET_VISIBILITY,
  UPLOAD_BANNER, UPLOAD_DATASET,
  UPLOAD_THUMBNAIL, CREATE_NEW_VERSION
} from 'app/const/api-const/dataset-url.const';
import axios from 'axios';
import { createResult, requestAPI } from 'services/axios/handle-api.const';

export interface DatasetValues {
  avatar: string,
  name: string,
  email: string,
  username: string,
  accountId: string,
  dataset: {
    _id: string,
    title: string,
    subtitle: string,
    url: string,
    size: number,
    description: string,
    visibility: string,
    path: string,
    files: Array<string>,
    like: Array<string>,
    countLike: number,
    tags: Array<Tags>,
    thumbnail: string,
    banner: string,
    versions: Array<Version>,
    createdDate: Date | string,
    lastUpdate: Date | string,
  }
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
    delete: any
  },
}

export interface DatasetValuesList {
  datasets: Array<DatasetValues>
  tagsDatasets: Array<Tags>
}

export interface Tags {
  _id?: string,
  datasetsLength?: number,
  datasets?: Array<DatasetValues>,
  name: string,
  createdDate?: Date | string,
}

export interface QueryString {
  title?: string,
  like?: 'asc' | 'desc',
  tags?: Array<string>,
  fileTypes?: string,
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
    visibility: '',
    path: '',
    banner: '',
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

  /* Get all tags from database */
  static getAllTags = async () => {
    return await requestAPI<Array<Tags>>(GET_ALL_TAGS_DATASET)
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
  static updateVisibility = async (datasetId: string, visibility: string) => {
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

  /* update dataset title and subtitle */
  static uploadBanner = async (bannerForm: FormData) => {
    try {
      const result = await axios.post(UPLOAD_BANNER.URL, bannerForm, {
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

  /* update dataset title and subtitle */
  static uploadImage = async (thumbnailForm: FormData) => {
    try {
      const result = await axios.post(UPLOAD_THUMBNAIL.URL, thumbnailForm, {
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
  static getTrending = async () => {
    return await requestAPI<DatasetValuesList>(GET_TRENDING_DATASET_TAGS)
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
  static downloadDatasetByPath = async (path: string) => {
    const data = {
      pathDataset: path
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
}