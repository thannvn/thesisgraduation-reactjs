import DatasetAPI, { DatasetSearchList, searchListDefault } from 'api/dataset-api';
import queryString from 'query-string';
import React from 'react';
import { RouteComponentProps } from 'react-router';
import DatasetFilterTemplate from './dataset-search.template';

interface DatasetSearchState {
  isLoading: boolean,
  currentPage: number,
  limit: number,
  previousSearchString: string,
  datasetValuesList: DatasetSearchList
}

export default class DatasetSearch extends React.Component<RouteComponentProps, DatasetSearchState> {
  state: DatasetSearchState = {
    isLoading: true,
    currentPage: 1,
    limit: 10,
    previousSearchString: '',
    datasetValuesList: searchListDefault
  }

  componentDidMount = async () => {
    const result = await this.getValueByQueryString(this.state.currentPage)
    this.setState({
      ...this.state,
      isLoading: false,
      previousSearchString: this.props.location.search,
      datasetValuesList: result?.data
    })
  }

  componentDidUpdate = async () => {
    if (this.state.previousSearchString !== this.props.location.search) {
      this.setState({
        ...this.state,
        isLoading: true,
        previousSearchString: this.props.location.search,
      })

      const result = await this.getValueByQueryString(1)
      this.setState({
        ...this.state,
        isLoading: false,
        currentPage: 1,
        datasetValuesList: result?.data
      })
    }
  }

  render() {
    return (
      <DatasetFilterTemplate self={this} />
    )
  }

  getValueByQueryString = async (page: number) => {
    const parseQuery = queryString.parse(this.props.location.search, { arrayFormat: 'index' })
    if (Object.keys(parseQuery).length === 0) {
      this.props.history.push('/dataset')
    } else {
      return await DatasetAPI.filterDataset(parseQuery, page, this.state.limit)
    }
  }

  handleChangeLike = async (index: number, accountId: string, isLike: boolean) => {
    const tempDatasets = [...this.state.datasetValuesList.datasets]
    if (isLike) {
      ++tempDatasets[index].dataset.countLike
      tempDatasets[index].dataset.like = [...tempDatasets[index].dataset.like, accountId]
    }
    else {
      --tempDatasets[index].dataset.countLike
      tempDatasets[index].dataset.like = tempDatasets[index].dataset.like.filter(id => id !== accountId)
    }
    this.setState({
      ...this.state,
      datasetValuesList: {
        ...this.state.datasetValuesList,
        datasets: tempDatasets
      }
    })
  }

  handleChangeCurrentPage = async (event: React.ChangeEvent<unknown>, value: number) => {
    if (value !== this.state.currentPage) {
      this.setState({
        ...this.state,
        isLoading: true,
      })
      const result = await this.getValueByQueryString(value)
      this.setState({
        ...this.state,
        isLoading: false,
        currentPage: value,
        datasetValuesList: result?.data
      })
    }
  }
}