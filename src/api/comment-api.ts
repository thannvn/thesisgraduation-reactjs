import {
  COUNT_COMMENT_IN_DATASET,
  DELETE_COMMENT, GET_ALL_COMMENT_IN_DATASET,
  LIKE_OR_UNLIKE_COMMENT, POST_COMMENT,
  UPDATE_COMMENT
} from 'app/const/api-const/comment-url.const';
import { requestAPI } from 'services/axios/handle-api.const';
import { defaultProfileValues, ProfileValues } from './profile-api';

export interface Comment {
  _id: string,
  commentator: ProfileValues,
  datasetId: string,
  content: string,
  like: Array<string>,
  countLike: number,
  parent?: Comment,
  createdDate: Date | string | number,
  lastUpdate: Date | string | number,
}

export const commentDefault: Comment = {
  _id: '',
  commentator: { ...defaultProfileValues },
  datasetId: '',
  content: '',
  like: [],
  parent: undefined,
  countLike: 0,
  createdDate: '',
  lastUpdate: '',
}

export default class CommentAPI {
  static getAllCommentInDataset = async (datasetId: string) => {
    const data = {
      datasetId: datasetId
    }
    return await requestAPI<Array<Comment>>(GET_ALL_COMMENT_IN_DATASET, data)

  }

  static postComment = async (datasetId: string, content: string, parent: string) => {
    const data = {
      datasetId: datasetId,
      content: content,
      parent: parent
    }
    return await requestAPI(POST_COMMENT, data)
  }

  static countCommentInDataset = async (datasetId: string) => {
    const data = {
      datasetId: datasetId
    }
    return await requestAPI(COUNT_COMMENT_IN_DATASET, data)
  }

  /* Like or unlike comment */
  static likeOrUnLikeComment = async (commentId: string) => {
    const data = {
      commentId: commentId
    }
    return await requestAPI(LIKE_OR_UNLIKE_COMMENT, data)
  }

  /* Update comment */
  static updateComment = async (commentId: string, content: string) => {
    const data = {
      commentId: commentId,
      content: content
    }
    return await requestAPI(UPDATE_COMMENT, data)

  }

  /* Delete comment */
  static deleteComment = async (commentId: string) => {
    const data = {
      commentId: commentId,
    }
    return await requestAPI(DELETE_COMMENT, data)
  }
}