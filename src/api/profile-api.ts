import { ApiTemplate } from './../services/axios/common-services.const';
import {
  GET_PROFILE, UPDATE_AVATAR,
  UPDATE_PROFILE,
  FILTER_DATASET_IN_PROFILE,
  UPDATE_ACCOUNT_MODE, DELETE_ACCOUNT, GET_RECOMMEND_ARRAY
} from 'app/const/api-const/profile-url.const';
import axios from 'axios';
import { createResult, requestAPI } from 'services/axios/handle-api.const';
import { DatasetValues, datasetDefaultValues, Tags, tagsDefaultValues } from './dataset-api';

export interface ProfileValues {
  _id: string,
  avatar: string,
  name: string,
  username: any,
  bio: string,
  dateOfBirth: Date | string,
  company: string,
  location: string,
  website: string,
  github: string,
  accountMode: number,
  recommend: Array<Tags>,
  datasets: Array<DatasetValues>,
  createdDate: string | Date,
}

interface Filter {
  userId: string,
  visibility: number | string,
  fileType: string,
  sort: number,
}

export const defaultProfileValues: ProfileValues = {
  _id: '',
  avatar: '',
  name: '',
  username: '',
  bio: '',
  dateOfBirth: new Date(),
  company: '',
  location: '',
  website: '',
  github: '',
  accountMode: 0,
  datasets: Array(5).fill(datasetDefaultValues),
  recommend: Array(5).fill(tagsDefaultValues),
  createdDate: new Date(),
}

export default class ProfileAPI {
  /* Get profile */
  static getProfile = async (username: string) => {
    GET_PROFILE.URL = `profile/${username}`
    return await requestAPI<ProfileValues>(GET_PROFILE)
  }

  /* Update profile */
  static updateProfile = async (newProfile: ProfileValues) => {
    const data = {
      profile: newProfile
    }
    return await requestAPI(UPDATE_PROFILE, data)
  }

  /* Update avatar */
  static updateAvatar = async (avatarForm: FormData) => {
    try {
      const result = await axios.post(UPDATE_AVATAR.URL, avatarForm, {
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

  static filterDataset = async (userId: string, visibility: number | string, fileType: string, sort: number) => {
    const data: Filter = {
      userId: userId,
      visibility: visibility,
      fileType: fileType,
      sort: sort
    }
    return await requestAPI(FILTER_DATASET_IN_PROFILE, data)
  }

  static updateAccountMode = async (mode: number) => {
    const data = {
      mode: mode
    }
    const request: ApiTemplate = {
      method: UPDATE_ACCOUNT_MODE.method,
      URL: `${UPDATE_ACCOUNT_MODE.URL}/${mode}`
    }
    return await requestAPI(request, data)
  }

  static deleteAccount = async () => {
    return await requestAPI(DELETE_ACCOUNT)
  }

  static updateRecommend = async (newRecommend: Array<Tags>) => {
    const data = {
      newRecommend
    }
    return await requestAPI(GET_RECOMMEND_ARRAY, data)
  }
}

