import CommonAPI from 'api/common-api'
import {
  Dataset,
  datasetDefaultValues,
  DatasetValues, DatasetValuesList,
  QueryString, tagsDefaultValues
} from 'api/dataset-api'
import queryString from 'query-string'
import React from 'react'
import { RouteComponentProps } from 'react-router'
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

  handleChangeLike = async (datasetId: string, isLike: boolean, userId: string) => {
    const tempTagsDatasets = [...this.state.datasetValuesList.tagsDatasets]
    const tempTopDatasets = this.setArrayLikeOrUnlike(this.state.datasetValuesList.topDatasets, datasetId, isLike, userId)
    const tempNewDatasets = this.setArrayLikeOrUnlike(this.state.datasetValuesList.newDatasets, datasetId, isLike, userId)
    const tempRecommend = this.setArrayLikeOrUnlike(this.state.datasetValuesList.recommend, datasetId, isLike, userId)
    tempTagsDatasets.forEach(item =>
      item.datasets = this.setArrayLikeOrUnlike(item.datasets || [], datasetId, isLike, userId
      ))

    this.setState((prev) => ({
      ...this.state,
      datasetValuesList: {
        topDatasets: tempTopDatasets,
        newDatasets: tempNewDatasets,
        recommend: tempRecommend,
        tagsDatasets: tempTagsDatasets
      }
    }))
  }

  handleCreateDataset = () => {
    this.props.history.push('dataset/create')
  }

  private setArrayLikeOrUnlike = (targetArray: Array<DatasetValues>, datasetId: string, isLike: boolean, userId: string)
    : Array<DatasetValues> => {
    return targetArray.map(item => {
      const isDataset = item.dataset._id === datasetId
      if (!isDataset) {
        return item
      }

      const newDataset: Dataset = {
        ...item.dataset,
        countLike: isLike ? item.dataset.countLike + 1 : item.dataset.countLike - 1,
        like: !isLike ? item.dataset.like.filter(item => item !== userId) : [],
      }

      if (isLike) newDataset.like.push(userId)

      return {
        ...item,
        dataset: newDataset,
      }
    })
  }
}
