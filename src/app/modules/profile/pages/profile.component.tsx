import React from 'react'
import ProfileAPI from '../../../../api/profile-api'
import ProfileTemplate from './profile.template'
import moment from 'moment'

interface ProfileState {
    isEdit: boolean,
    userInfo: any,
}

interface Values {
    avatar: string,
    name: string,
    username: string,
    bio: string | null,
    dateOfBirth: Date | null,
    company: string | null,
    location: string | null,
    website: string | null,
    github: string | null,
}

export default class Profile extends React.Component {
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

    state: ProfileState = {
        isEdit: false,
        userInfo: {},
    }

    handleChangeEditMode = () => {
        this.setState({ ...this.state, isEdit: !this.state.isEdit })
    }

    handleSaveEdit = async (data: any) => {
        const dateOfBirth = `${moment(data.dateOfBirth).format('M')}
            / ${moment(data.dateOfBirth).format('D')}
            / ${moment(data.dateOfBirth).format('YYYY')}`
            const {avatar, username} = this.state.userInfo
        data.avatar = avatar
        data.username = username
        data.dateOfBirth = dateOfBirth
        this.handleChangeEditMode()
        this.setState({...this.state, userInfo: data})
    }

    handleCancelEdit = () => {
        this.handleChangeEditMode()
    }

    componentDidMount = async () => {
        const result = await ProfileAPI.getProfile()
        this.setState({ ...this.state, userInfo: result.message })
    }

    render() {
        return (
            <ProfileTemplate self={this} />
        )
    }
}