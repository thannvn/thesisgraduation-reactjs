import { GET_PROFILE, UPDATE_AVATAR, UPDATE_PROFILE } from 'app/const/api-const/profile-url.const';
import axios from 'axios';
import { createResult, requestAPI } from 'services/axios/handle-api.const';
import { DatasetValues, datasetDefaultValues } from './dataset-api';

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
  datasets: Array<DatasetValues>
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
  datasets: Array(5).fill(datasetDefaultValues),
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
}