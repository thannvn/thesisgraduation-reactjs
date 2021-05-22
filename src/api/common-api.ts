import { GET_ALL_TAGS_DATASET } from 'app/const/api-const/common-url.const';
import { requestAPI } from 'services/axios/handle-api.const';
import { Tags } from './dataset-api';

export default class CommonAPI {
  /* Get all tags from database */
  static getAllTags = async () => {
    return await requestAPI<Array<Tags>>(GET_ALL_TAGS_DATASET)
  }
}