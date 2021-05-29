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
    const tempTagsDatasets = [...this.state.datasetValuesList.tagsDatasets]
    tempTagsDatasets.forEach(item => this.setArrayLikeOrUnlike(item.datasets || [], datasetId, isLike))

    this.setState((prev) => ({
      ...this.state,
      datasetValuesList: {
        topDatasets: this.setArrayLikeOrUnlike(prev.datasetValuesList.topDatasets, datasetId, isLike),
        newDatasets: this.setArrayLikeOrUnlike(prev.datasetValuesList.newDatasets, datasetId, isLike),
        recommend: this.setArrayLikeOrUnlike(prev.datasetValuesList.recommend, datasetId, isLike),
        tagsDatasets: tempTagsDatasets
      }
    }))
  }

  handleCreateDataset = () => {
    this.props.history.push('dataset/create')
  }

  private setArrayLikeOrUnlike = (targetArray: Array<DatasetValues>, datasetId: string, isLike: boolean): Array<DatasetValues> => {
    targetArray.map(item => {
      const isDataset = item.dataset._id === datasetId
      console.log(isDataset, isLike)

      if (!isDataset) {
        return item
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
