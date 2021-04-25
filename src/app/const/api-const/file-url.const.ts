import { ApiTemplate } from 'services/axios/common-services.const'

const GET_ALL_FILES_DATASET: ApiTemplate = {
  method: "POST",
  URL: "file/all"
}
const GET_FILE_CONTENT: ApiTemplate = {
  method: "POST",
  URL: "file/content"
}
const UPDATE_FILE_DESCRIPTION: ApiTemplate = {
  method: "POST",
  URL: "file/update/description"
}
const UPDATE_FILE_COLUMNS: ApiTemplate = {
  method: "POST",
  URL: "file/update/columns"
}
const DOWNLOAD_FILE: ApiTemplate = {
  method: "POST",
  URL: `${process.env.REACT_APP_BASE_URL_API}file/download`
}

export {
  UPDATE_FILE_DESCRIPTION,
  UPDATE_FILE_COLUMNS,
  GET_ALL_FILES_DATASET,
  GET_FILE_CONTENT,
  DOWNLOAD_FILE,
};