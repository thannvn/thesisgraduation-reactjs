import { ApiTemplate } from 'services/axios/common-services.const'

const GET_PROFILE: ApiTemplate = {
  method: "GET",
  URL: ''
}

const UPDATE_PROFILE: ApiTemplate = {
  method: "POST",
  URL: "profile/update-info"
}

const UPDATE_AVATAR: ApiTemplate = {
  method: "POST",
  URL: `${process.env.REACT_APP_BASE_URL_API}profile/update-avatar`
}

const FILTER_DATASET_IN_PROFILE: ApiTemplate = {
  method: "POST",
  URL: "profile/filter-dataset"
}

const UPDATE_ACCOUNT_MODE: ApiTemplate = {
  method: 'GET',
  URL: 'profile/update-mode'
}

const DELETE_ACCOUNT: ApiTemplate = {
  method: 'GET',
  URL: 'profile/delete'
}

const GET_RECOMMEND_ARRAY: ApiTemplate = {
  method: 'GET',
  URL: 'profile/recommend'
}

const UPDATE_RECOMMEND: ApiTemplate = {
  method: 'POST',
  URL: 'profile/update-recommend'
}


export {
  GET_PROFILE,
  UPDATE_PROFILE,
  UPDATE_AVATAR,
  FILTER_DATASET_IN_PROFILE,
  UPDATE_ACCOUNT_MODE,
  DELETE_ACCOUNT,
  GET_RECOMMEND_ARRAY,
  UPDATE_RECOMMEND,
};