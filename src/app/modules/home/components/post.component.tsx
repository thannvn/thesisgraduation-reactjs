import {
    Avatar,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    IconButton
} from '@material-ui/core';
import { ChatBubbleOutlineOutlined, FavoriteBorder, MoreVert, Share } from '@material-ui/icons';
import React from 'react';
import ButtonSpan from '../../../../dataworld/parts/button-span/button-span.component';
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
                <IconButton aria-label='like' className='p-button-action'>
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
                <ButtonSpan label='1000 likes' className='p-label-bold' />
                <ButtonSpan label='Thann' />
                <ButtonSpan label='View all comments...' />
            </CardContent>

            <CardActions className='b-comment-box'>
                <input placeholder='Add a comment...' className='p-input-comment'></input>
                <ButtonSpan label='Post' className='h-mr-24' color='primary' />
            </CardActions>
        </Card>
    )
}