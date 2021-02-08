import React from 'react'
import ProfileAPI from '../../../../api/profile-api'
import ProfileTemplate from './profile.template'
import moment from 'moment'

interface ProfileState {
    isEdit: boolean,
    userInfo: any,
}

interface Values {
    bio: string | null,
    dateOfBirth: Date | null,
    company: string | null,
    location: string | null,
    website: string | null,
    github: string | null,
}

export default class Profile extends React.Component {
    state: ProfileState = {
        isEdit: false,
        userInfo: {},
    }

    defaultValues: Values = {
        bio: '',
        dateOfBirth:  new Date(),
        company: '',
        location: '',
        website: '',
        github: '',
    }

    handleChangeEditMode = () => {
        this.setState({ ...this.state, isEdit: !this.state.isEdit })
    }

    handleSaveEdit = async (data: any) => {
        console.log(moment(data.dateOfBirth).format())
        // this.setState({...this.state, userInfo: data})
        this.handleChangeEditMode()
    }

    handleCancelEdit = () => {
        this.handleChangeEditMode()
    }

    componentDidMount = async () => {
        const result = await ProfileAPI.getProfile()
        this.setState({...this.state, userInfo: result.message})
    }
    
    render() {
        return (
            <ProfileTemplate self={this} />
        )
    }
}