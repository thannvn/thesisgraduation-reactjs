import React from 'react'
import ProfileAPI, { ProfileValues, defaultProfileValues } from 'api/profile-api'
import HandleCommon from 'utils/handle-common'
import { STATUS_OK } from 'services/axios/common-services.const'
import { RouteComponentProps } from "react-router-dom";
import ProfileTemplate from './profile.template'

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

  handleChangeEditMode = () => {
    this.setState({ ...this.state, isEdit: !this.state.isEdit })
  }

  handleSaveEdit = async (data: ProfileValues) => {
    const result = await ProfileAPI.updateProfile(data)
    if (result.status === STATUS_OK) {
      const { avatar, username } = this.state.userInfo
      data.avatar = avatar
      data.username = username
      data.dateOfBirth = HandleCommon.handleDateOfBirth(data.dateOfBirth)
      this.defaultValues = data
      this.handleChangeEditMode()
      this.setState({ ...this.state, userInfo: data })
    }
  }

  handleCancelEdit = () => {
    this.handleChangeEditMode()
  }

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
    }
    this.setState({ ...this.state, userInfo: result.data, isLoading: false })
  }

  render() {
    return (
      <ProfileTemplate self={this} />
    )
  }
}