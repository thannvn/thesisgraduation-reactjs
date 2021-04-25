import { ApiTemplate } from 'services/axios/common-services.const'

const UPLOAD_DATASET: ApiTemplate = {
  method: "POST",
  URL: `${process.env.REACT_APP_BASE_URL_API}dataset/new-dataset`
}

const GET_ALL_TAGS_DATASET: ApiTemplate = {
  method: "GET",
  URL: `dataset/all-tags`
}

const GET_TRENDING_DATASET_TAGS: ApiTemplate = {
  method: "GET",
  URL: `dataset/trending`
}

const SEARCH_DATASET: ApiTemplate = {
  method: "POST",
  URL: `dataset/search`
}

const UPLOAD_BANNER: ApiTemplate = {
  method: "POST",
  URL: `${process.env.REACT_APP_BASE_URL_API}dataset/update/banner`
}

const UPLOAD_THUMBNAIL: ApiTemplate = {
  method: "POST",
  URL: `${process.env.REACT_APP_BASE_URL_API}dataset/update/thumbnail`
}

const GET_DATASET: ApiTemplate = {
  method: "GET",
  URL: ""
}

const UPDATE_DATASET_DESCRIPTION: ApiTemplate = {
  method: "POST",
  URL: "dataset/update/description"
}

const UPDATE_DATASET_VISIBILITY: ApiTemplate = {
  method: "POST",
  URL: "dataset/update/visibility"
}

const UPDATE_DATASET_TITLE_SUBTITLE: ApiTemplate = {
  method: "POST",
  URL: "dataset/update/title-subtitle"
}

const LIKE_OR_UNLIKE_DATASET: ApiTemplate = {
  method: "POST",
  URL: "dataset/like"
}

const UPDATE_DATASET_TAGS: ApiTemplate = {
  method: "POST",
  URL: "dataset/update/tags"
}

const DOWNLOAD_DATASET: ApiTemplate = {
  method: "POST",
  URL: `${process.env.REACT_APP_BASE_URL_API}dataset/download`
}

const CREATE_NEW_VERSION: ApiTemplate = {
  method: "POST",
  URL: `${process.env.REACT_APP_BASE_URL_API}dataset/new-version`
}

export {
  UPLOAD_DATASET,
  UPLOAD_BANNER,
  GET_DATASET,
  UPDATE_DATASET_DESCRIPTION,
  UPDATE_DATASET_VISIBILITY,
  UPDATE_DATASET_TITLE_SUBTITLE,
  UPLOAD_THUMBNAIL,
  GET_ALL_TAGS_DATASET,
  UPDATE_DATASET_TAGS,
  GET_TRENDING_DATASET_TAGS,
  SEARCH_DATASET,
  LIKE_OR_UNLIKE_DATASET,
  DOWNLOAD_DATASET,
  CREATE_NEW_VERSION
};