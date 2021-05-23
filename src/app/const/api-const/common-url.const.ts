import { ApiTemplate } from "services/axios/common-services.const";

const GET_ALL_TAGS_DATASET: ApiTemplate = {
  method: "GET",
  URL: `common/all-tags`
}

const GET_RECOMMEND_LIST: ApiTemplate = {
  method: "GET",
  URL: `common/recommend-list`
}

export {
  GET_ALL_TAGS_DATASET,
  GET_RECOMMEND_LIST
};
