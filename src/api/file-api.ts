import { requestAPI } from 'services/axios/handle-api.const';
import {
  GET_ALL_FILES_DATASET,
  GET_FILE_CONTENT,
  UPDATE_FILE_COLUMNS, UPDATE_FILE_DESCRIPTION,
  DOWNLOAD_FILE
} from 'app/const/api-const/file-url.const';
import axios from 'axios';

export interface DatasetFiles {
  files: Array<FileInfo>
}

export interface ColumnInfo {
  name: string,
  type: number,
  analysis: ColumnAnalysis,
  description: string,
}

export interface FileInfo {
  _id: string,
  name: string,
  size: number,
  summary: object,
  path: string,
  description: string,
  columns: Array<ColumnInfo>,
  createdDate: Date | string,
  lastUpdate: Date | string,
}

interface Quartile {
  q1: number,
  q2: number,
  q3: number,
}

export interface ColumnAnalysis {
  valid: number,
  wrongType: number,
  missing: number,
  unique: number,
  timeValueAppearChunk: any,
  mostFrequently: any,
  percentageMostFrequently: number,
  max: number,
  variance: number,
  standardDeviation: number,
  mean: number,
  quartile: Quartile,
  range: number,
  min: number
}

export const fileDefaultValues: FileInfo = {
  _id: '',
  name: '',
  size: 0,
  summary: {},
  path: '',
  description: '',
  columns: [],
  createdDate: '',
  lastUpdate: '',
}

export const defaultAnalysis: ColumnAnalysis = {
  valid: 0,
  wrongType: 0,
  missing: 0,
  unique: 0,
  timeValueAppearChunk: {},
  mostFrequently: '',
  percentageMostFrequently: 0,
  max: 0,
  variance: 0,
  standardDeviation: 0,
  mean: 0,
  quartile: {
    q1: 0,
    q2: 0,
    q3: 0
  },
  range: 0,
  min: 0
}

export const columnDefaultValues: ColumnInfo = {
  name: '',
  type: 0,
  analysis: defaultAnalysis,
  description: '',
}

export default class FileAPI {
  static getAllFilesInfoInDataset = async (datasetId: string | undefined) => {
    const data = {
      datasetId: datasetId
    }
    return await requestAPI<DatasetFiles>(GET_ALL_FILES_DATASET, data)
  }

  static getOneFileInDataset = async (path: string) => {
    const data = {
      path: path
    }
    return await requestAPI<Array<object>>(GET_FILE_CONTENT, data)
  }

  static updateFileDescription = async (datasetId: string, fileId: string, description: string) => {
    const data = {
      datasetId: datasetId,
      fileId: fileId,
      description: description,
    }
    return await requestAPI(UPDATE_FILE_DESCRIPTION, data)
  }

  static updateFileColumns = async (datasetId: string, fileId: string,
    columns: Array<ColumnInfo>, filePath: string) => {
    const data = {
      fileId: fileId,
      datasetId: datasetId,
      columns: columns,
      filePath: filePath
    }
    return await requestAPI<Array<ColumnInfo>>(UPDATE_FILE_COLUMNS, data)
  }

  static downloadFileByPath = async (path: string) => {
    const data = {
      path: path
    }
    return await axios.request({
      method: 'POST',
      url: DOWNLOAD_FILE.URL,
      headers: {
        "auth-token": localStorage.getItem("auth-token"),
      },
      data: data,
      responseType: 'blob',
    })
  }
}