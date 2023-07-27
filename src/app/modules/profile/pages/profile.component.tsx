import React from 'react'
import ProfileAPI, { ProfileValues, defaultProfileValues } from 'api/profile-api'
import HandleCommon from 'utils/handle-common'
import { STATUS_OK } from 'services/axios/common-services.const'
import { RouteComponentProps } from "react-router-dom";
import ProfileTemplate from './profile.template'
import { Dataset, DatasetValues, Tags } from 'api/dataset-api';
import addToast from 'dataworld/parts/toast/add-toast.component';

interface ProfileState {
  isLoading: boolean,
  isEdit: boolean,
  userInfo: ProfileValues,
}

interface RouteParams {
  username: string
}

export default class Profile extends React.Component<RouteComponentProps<RouteParams>, ProfileState> {
  state: ProfileState = {
    isLoading: true,
    isEdit: false,
    userInfo: { ...defaultProfileValues },
  }
  defaultValues: ProfileValues = { ...defaultProfileValues }

  componentDidMount = async () => {
    const { username } = this.props.match.params;
    const result = await ProfileAPI.getProfile(username)

    if (result.status !== STATUS_OK) {
      return this.props.history.push('/404')
    }

    document.title = result.data ? result.data.name : 'Thông tin tài khoản'
    this.defaultValues = result.data

    if (result.data) {
      result.data.dateOfBirth = HandleCommon.handleDateOfBirth(result.data.dateOfBirth)
      result.data.datasets = result.data.datasets.map((dataset: Dataset) =>
        this.createDatasetObject(dataset, result.data)
      );
    }

    this.setState({ ...this.state, userInfo: result.data, isLoading: false })
  }

  render() {
    return (
      <ProfileTemplate self={this} />
    )
  }

  handleChangeEditMode = () => {
    this.setState({ ...this.state, isEdit: !this.state.isEdit })
  }

  handleSaveEdit = async (data: ProfileValues) => {
    const result = await ProfileAPI.updateProfile(data)
    if (result.status === STATUS_OK) {
      const { avatar, username, datasets, recommend } = this.state.userInfo
      data.avatar = avatar
      data.username = username
      data.dateOfBirth = HandleCommon.handleDateOfBirth(data.dateOfBirth)
      data.datasets = datasets
      data.recommend = recommend
      this.defaultValues = data
      this.handleChangeEditMode()
      addToast({ message: result.message, type: 'success' })
      this.setState({ ...this.state, userInfo: data })
    }
  }

  handleCancelEdit = () => {
    this.handleChangeEditMode()
  }

  handleChangeLike = async (index: number, accountId: string, isLike: boolean) => {
    const tempDatasets = [...this.state.userInfo.datasets]
    if (isLike) {
      ++tempDatasets[index].dataset.countLike
      tempDatasets[index].dataset.like = [...tempDatasets[index].dataset.like, accountId]
    }
    else {
      --tempDatasets[index].dataset.countLike
      tempDatasets[index].dataset.like = tempDatasets[index].dataset.like.filter(id => id !== accountId)
    }
    this.setState({
      userInfo: {
        ...this.state.userInfo,
        datasets: tempDatasets
      }
    })
  }

  //handle change account mode
  setAccountMode = (mode: number) => {
    this.setState({
      userInfo: {
        ...this.state.userInfo,
        accountMode: mode
      }
    })
  }

  //Handle set new recommend
  setRecommend = (recommend: Array<Tags>) => {
    this.setState({
      userInfo: {
        ...this.state.userInfo,
        recommend: recommend,
      }
    })
  }

  //Set new filter dataset
  handleFilterDataset = async (datasets: Array<Dataset>) => {
    this.setState({
      userInfo: {
        ...this.state.userInfo,
        datasets: datasets.map((dataset: Dataset) =>
          this.createDatasetObject(dataset, this.state.userInfo)
        )
      },
    })
  }

  //Create dataset object from result database
  private createDatasetObject = (dataset: Dataset, user: any): DatasetValues => {
    const { _id, avatar, name, username, email } = user;
    return {
      accountId: _id,
      avatar: avatar,
      name: name,
      email: email,
      username: username,
      dataset: dataset,
    };
  }
}