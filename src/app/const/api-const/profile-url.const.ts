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

export {
  GET_PROFILE,
  UPDATE_PROFILE,
  UPDATE_AVATAR
};