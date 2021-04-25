import DatasetAPI, {
  datasetDefaultValues,
  DatasetValuesList,
  tagsDefaultValues,
  QueryString
} from 'api/dataset-api'
import React from 'react'
import queryString from 'query-string'
import DataSetListTemplate from './dataset-list.template'
import { RouteComponentProps } from 'react-router'

interface DatasetListState {
  isLoading: boolean,
  datasetValuesList: DatasetValuesList,
}

export default class DatasetList extends React.Component<RouteComponentProps<any>, DatasetListState> {
  state: DatasetListState = {
    isLoading: true,
    datasetValuesList: {
      datasets: Array(4).fill(datasetDefaultValues),
      tagsDatasets: Array(5).fill(tagsDefaultValues)
    }
  }

  componentDidMount = async () => {
    document.title = 'Danh sách dataset'
    const result = await DatasetAPI.getTrending()
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

  handleChangeLike = async (tagsIndex: number, datasetsIndex: number, accountId: string, isLike: boolean) => {
    const tempDatasets = [...this.state.datasetValuesList.datasets]
    const tempTagsDatasets = [...this.state.datasetValuesList.tagsDatasets]
    if (tagsIndex === -1) {
      const findDataset = tempDatasets[datasetsIndex]
      if (isLike) {
        ++findDataset.dataset.countLike
        findDataset.dataset.like = [...findDataset.dataset.like, accountId]
      }
      else {
        --tempDatasets[datasetsIndex].dataset.countLike
        tempDatasets[datasetsIndex].dataset.like = tempDatasets[datasetsIndex]
          .dataset.like.filter(id => id !== accountId)
      }
    } else {
      const findDatasets = tempTagsDatasets[tagsIndex].datasets
      if (!findDatasets) return
      if (isLike) {
        ++findDatasets[datasetsIndex].dataset.countLike
        findDatasets[datasetsIndex].dataset.like = [...findDatasets[datasetsIndex].dataset.like, accountId]
      }
      else {
        --findDatasets[datasetsIndex].dataset.countLike
        findDatasets[datasetsIndex].dataset.like = findDatasets[datasetsIndex]
          .dataset.like.filter(id => id !== accountId)
      }
    }

    this.setState({
      ...this.state,
      datasetValuesList: {
        datasets: tempDatasets,
        tagsDatasets: tempTagsDatasets
      }
    })
  }
}
