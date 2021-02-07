import React from 'react'
import ProfileTemplate from './profile.template'

interface ProfileState {
    isEdit: boolean
}

export default class Profile extends React.Component {
    state: ProfileState = {
        isEdit: false
    }

    handleChangeEditMode = () => {
        this.setState({ ...this.state, isEdit: !this.state.isEdit })
    }

    handleSaveEdit = () => {
        this.handleChangeEditMode()
    }

    handleCancelEdit = () => {
        this.handleChangeEditMode()
    }
    
    render() {
        return (
            <ProfileTemplate self={this} />
        )
    }
}