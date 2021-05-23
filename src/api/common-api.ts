import { GET_ALL_TAGS_DATASET, GET_RECOMMEND_LIST } from 'app/const/api-const/common-url.const';
import { requestAPI } from 'services/axios/handle-api.const';
import { DatasetValues, Tags } from './dataset-api';

export default class CommonAPI {
  /* Get all tags from database */
  static getAllTags = async () => {
    return await requestAPI<Array<Tags>>(GET_ALL_TAGS_DATASET)
  }

  /* Get recommend list from database */
  static getRecommendList = async () => {
    return await requestAPI<Array<DatasetValues>>(GET_RECOMMEND_LIST)
  }
}