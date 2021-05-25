import { GET_ALL_TAGS_DATASET, GET_RECOMMEND_LIST, GET_TRENDING_DATASET_TAGS } from 'app/const/api-const/common-url.const';
import { requestAPI } from 'services/axios/handle-api.const';
import { DatasetValues, DatasetValuesList, Tags } from './dataset-api';

export default class CommonAPI {
  /* Get all tags from database */
  static getAllTags = async () => {
    return await requestAPI<Array<Tags>>(GET_ALL_TAGS_DATASET)
  }

  /* Get recommend list from database */
  static getRecommendList = async () => {
    return await requestAPI<Array<DatasetValues>>(GET_RECOMMEND_LIST)
  }

  /* get trending dataset and tags dataset */
  static getTrending = async () => {
    return await requestAPI<DatasetValuesList>(GET_TRENDING_DATASET_TAGS)
  }
}