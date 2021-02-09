import React from 'react'
import ProfileAPI from '../../../../api/profile-api'
import DateTime from '../../../../utils/handle-date-time'
import { STATUS_OK } from '../../../const/status-api.const'
import ProfileTemplate from './profile.template'

interface ProfileState {
  isEdit: boolean,
  userInfo: Values,
}

interface Values {
  avatar: string,
  name: string,
  username: string,
  bio: string,
  dateOfBirth: Date | string,
  company: string,
  location: string,
  website: string,
  github: string,
}

export default class Profile extends React.Component {
  state: ProfileState = {
    isEdit: false,
    userInfo: {
      avatar: '',
      name: '',
      username: '',
      bio: '',
      dateOfBirth: '',
      company: '',
      location: '',
      website: '',
      github: '',
    },
  }

  defaultValues: Values = {
    avatar: '',
    name: '',
    username: '',
    bio: '',
    dateOfBirth: new Date(),
    company: '',
    location: '',
    website: '',
    github: '',
  }

  handleChangeEditMode = () => {
    this.setState({ ...this.state, isEdit: !this.state.isEdit })
  }

  handleSaveEdit = async (data: any) => {
    const result = await ProfileAPI.updateProfile(data)
    if (result.status === STATUS_OK) {
      const { avatar, username } = this.state.userInfo
      data.avatar = avatar
      data.username = username
      data.dateOfBirth = DateTime.handleDateOfBirth(data.dateOfBirth)
      this.defaultValues = data
      this.handleChangeEditMode()
      this.setState({ ...this.state, userInfo: data })
    }

  }

  handleCancelEdit = () => {
    this.handleChangeEditMode()
  }

  componentDidMount = async () => {
    const result = await ProfileAPI.getProfile()
    this.defaultValues = result.message
    result.message.dateOfBirth = DateTime.handleDateOfBirth(result.message.dateOfBirth)
    this.setState({ ...this.state, userInfo: result.message })
  }

  render() {
    return (
      <ProfileTemplate self={this} />
    )
  }
}