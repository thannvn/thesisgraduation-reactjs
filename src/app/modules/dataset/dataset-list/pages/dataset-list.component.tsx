import CommonAPI from 'api/common-api'
import DatasetAPI, {
  datasetDefaultValues,
  DatasetValues, DatasetValuesList,
  QueryString, tagsDefaultValues
} from 'api/dataset-api'
import queryString from 'query-string'
import React from 'react'
import { RouteComponentProps } from 'react-router'
import DataSetListTemplate from './dataset-list.template'
import _ from 'lodash'
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

  handleChangeLike = async (datasetId: string, isLike: boolean) => {
    console.log(datasetId)
    const tempTopDatasets = [...this.state.datasetValuesList.topDatasets]
    const tempTagsDatasets = [...this.state.datasetValuesList.tagsDatasets]
    const tempNewDatasets = [...this.state.datasetValuesList.newDatasets]
    const tempRecommend = [...this.state.datasetValuesList.recommend]
    tempTagsDatasets.forEach(item => this.setArrayLikeOrUnlike(item.datasets || [], datasetId, isLike))

    this.setState((prev) => ({
      ...this.state,
      datasetValuesList: {
        topDatasets: prev.datasetValuesList.topDatasets,
        newDatasets: this.setArrayLikeOrUnlike(tempNewDatasets, datasetId, isLike),
        recommend: this.setArrayLikeOrUnlike(tempRecommend, datasetId, isLike),
        tagsDatasets: tempTagsDatasets
      }
    }))
  }

  handleCreateDataset = () => {
    this.props.history.push('dataset/create')
  }

  private setArrayLikeOrUnlike = (targetArray: Array<DatasetValues>, datasetId: string, isLike: boolean): Array<DatasetValues> => {
    targetArray.map(item => {

      if (item.dataset._id === datasetId) {
        isLike ? item.dataset.countLike++ : item.dataset.countLike--

      }
      return {
        ...item,
        countLike: isLike ? item.dataset.countLike + 1 : item.dataset.countLike - 1,
        like: isLike ? item.dataset.like.push(datasetId) : _.pull(item.dataset.like, datasetId)
      }
    })
    return targetArray
  }
}
