import {
    Avatar,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    IconButton,
    TextField,
    Typography
} from '@material-ui/core';
import { MoreVert, FavoriteBorder, ChatBubbleOutlineOutlined, Share } from '@material-ui/icons';
import React from 'react';
import '../css/post.scss';

export default function Post() {
    return (
        <Card className='t-card-post'>
            <CardHeader
                avatar={<Avatar aria-label="avatar" src={process.env.PUBLIC_URL + 'images/avatar.jpg'} />}
                action={
                    <IconButton aria-label="settings">
                        <MoreVert />
                    </IconButton>}
                title="Thann"
                subheader="September 14, 2016"
            />
            <CardMedia
                className='b-card-media'
                image={process.env.PUBLIC_URL + 'images/data-content.jpg'}
                title="data"
            />
            <CardActions disableSpacing className='b-card-action'>
                <IconButton aria-label='like' className='p-button-action '>
                    <FavoriteBorder />
                </IconButton>
                <IconButton aria-label='comment' className='p-button-action h-ml-20'>
                    <ChatBubbleOutlineOutlined />
                </IconButton>
                <IconButton aria-label='share' className='p-button-action h-ml-20'>
                    <Share />
                </IconButton>
            </CardActions>
            <CardContent>
                <Typography className='p-span-button'>1000 likes</Typography>
                <Typography className='p-span-button'>View comment</Typography>
            </CardContent>

            <CardActions className='b-comment-box'>
                <input placeholder='Add a comment...' className='p-input-comment'></input>
                <Typography className='p-span-button'>Post</Typography>
            </CardActions>
        </Card>
    )
}