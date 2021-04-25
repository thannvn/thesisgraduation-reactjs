import { ApiTemplate } from 'services/axios/common-services.const'

const GET_ALL_COMMENT_IN_DATASET: ApiTemplate = {
  method: "POST",
  URL: 'comment/all'
}

const POST_COMMENT: ApiTemplate = {
  method: "POST",
  URL: 'comment/create'
}

const COUNT_COMMENT_IN_DATASET: ApiTemplate = {
  method: "POST",
  URL: 'comment/count'
}

const LIKE_OR_UNLIKE_COMMENT: ApiTemplate = {
  method: "POST",
  URL: "comment/like"
}

const UPDATE_COMMENT: ApiTemplate = {
  method: "POST",
  URL: "comment/update"
}

const DELETE_COMMENT: ApiTemplate = {
  method: "POST",
  URL: "comment/delete"
}


export {
  GET_ALL_COMMENT_IN_DATASET,
  POST_COMMENT,
  COUNT_COMMENT_IN_DATASET,
  LIKE_OR_UNLIKE_COMMENT,
  UPDATE_COMMENT,
  DELETE_COMMENT,
};