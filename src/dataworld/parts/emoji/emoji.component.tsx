import React, { useState } from 'react'
import { Picker } from 'emoji-mart'
import "emoji-mart/css/emoji-mart.css";
import { IconButton, Popover } from '@material-ui/core'
import SentimentSatisfiedSharpIcon from '@material-ui/icons/SentimentSatisfiedSharp';

interface EmojiProps {
    message: any,
    setMessage: any
}

export default function Emoji({
    message,
    setMessage = () => {}
}: EmojiProps) {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

    const triggerPicker = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const handleSetMessage = (emoji: any) => {
        setMessage(message + emoji.native)
    }

    const open = Boolean(anchorEl)

    return (
        <>
            <Popover
                id='popup-emoji'
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left'
                }}
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <Picker
                    useButton={false}
                    showSkinTones={false}
                    showPreview={false}
                    emoji='point_up'
                    onSelect={emoji => handleSetMessage(emoji)} />
            </Popover>

            <IconButton onClick={triggerPicker}>
                <SentimentSatisfiedSharpIcon />
            </IconButton>
        </>
    )
}