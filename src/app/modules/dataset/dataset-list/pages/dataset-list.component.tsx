import CommonAPI from 'api/common-api'
import DatasetAPI, {
  datasetDefaultValues,
  DatasetValues, DatasetValuesList,
  QueryString, tagsDefaultValues
} from 'api/dataset-api'
import queryString from 'query-string'
import React from 'react'
import { RouteComponentProps } from 'react-router'
import { ListIndex } from '../const/list-index.const'
import DataSetListTemplate from './dataset-list.template'
interface DatasetListState {
  isLoading: boolean,
  datasetValuesList: DatasetValuesList,
}

export default class DatasetList extends React.Component<RouteComponentProps<any>, DatasetListState> {
  state: DatasetListState = {
    isLoading: true,
    datasetValuesList: {
      topDatasets: Array(4).fill(datasetDefaultValues),
      newDatasets: Array(4).fill(datasetDefaultValues),
      recommend: Array(4).fill(datasetDefaultValues),
      tagsDatasets: Array(5).fill(tagsDefaultValues)
    }
  }

  componentDidMount = async () => {
    document.title = 'Danh sách dataset'
    const result = await CommonAPI.getTrending()
    this.setState({
      ...this.state,
      isLoading: false,
      datasetValuesList: result.data,
    })
  }

  render() {
    return (
      <DataSetListTemplate self={this} />
    )
  }

  handleSearchAlls = (search: QueryString) => {
    const stringified = queryString.stringify(search, { arrayFormat: 'index' })
    this.props.history.push(`/dataset/search?${stringified}`)
  }

  handleChangeLike = async (isTagsList: boolean, listIndex: number,
    datasetIndex: number, accountId: string, isLike: boolean) => {
    const tempTopDatasets = [...this.state.datasetValuesList.topDatasets]
    const tempTagsDatasets = [...this.state.datasetValuesList.tagsDatasets]
    const tempNewDatasets = [...this.state.datasetValuesList.newDatasets]
    const tempRecommend = [...this.state.datasetValuesList.recommend]

    if (!isTagsList) {
      switch (listIndex) {
        case ListIndex.TOP_DATASET:
          this.setArrayLikeOrUnlike(tempTopDatasets, datasetIndex, isLike, accountId)
          break;
        case ListIndex.NEW_DATASET:
          this.setArrayLikeOrUnlike(tempNewDatasets, datasetIndex, isLike, accountId)
          break
        case ListIndex.RECOMMEND:
          this.setArrayLikeOrUnlike(tempRecommend, datasetIndex, isLike, accountId)
          break
      }
    } else {
      this.setArrayLikeOrUnlike(tempTagsDatasets[listIndex].datasets, datasetIndex, isLike, accountId)
    }

    this.setState({
      ...this.state,
      datasetValuesList: {
        topDatasets: tempTopDatasets,
        newDatasets: tempNewDatasets,
        recommend: tempRecommend,
        tagsDatasets: tempTagsDatasets
      }
    })
  }

  private setArrayLikeOrUnlike = async (datasets: Array<DatasetValues> | undefined, index: number, isLike: boolean, accountId: string) => {
    if (!datasets) return
    if (isLike) {
      ++datasets[index].dataset.countLike
      datasets[index].dataset.like = [...datasets[index].dataset.like, accountId]
    }
    else {
      --datasets[index].dataset.countLike
      datasets[index].dataset.like = datasets[index]
        .dataset.like.filter(id => id !== accountId)
    }
  }
}
