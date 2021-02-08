import {
    Avatar,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    IconButton,
    Typography
} from '@material-ui/core';
import { FavoriteBorder } from '@material-ui/icons';
import React, { useState } from 'react';
import Emoji from '../../../../dataworld/parts/emoji/emoji.component';
import '../css/post.scss';

export default function Post() {
    const [message, setMessage] = useState<any>('')
    return (
        <Card className='t-card-post'>
            <CardHeader
                avatar={<Avatar aria-label="avatar" src={process.env.PUBLIC_URL + 'images/avatar.jpg'} />}
                action={
                    <IconButton aria-label='like' className='p-button-action h-mt-14 h-mr-8'>
                        <FavoriteBorder />
                    </IconButton>}
                title="Thann"
                subheader="September 14, 2016"
            />

            <CardContent>
                <div>
                    <Typography variant='h5'>
                        Baseline - Mmdetection Instance Segmentation Model
                    </Typography>
                    <Typography variant='subtitle1' className='p-sub-title h-ml-2' gutterBottom>
                        in the <a href='/'>Riiid Answer Correctness Prediction</a>
                    </Typography>
                    <span className='h-ml-12 p-content'>
                        I am a beginner here. Everytime I try to submit my notebook which is using 3- TTA, my notebook gets an error saying "Notebook Exceeded Allowed Compute" . Can someone please help me solve this problem
                    </span>
                </div>
                <div>
                    <button className='p-button-span p-label-bold h-mt-20'>1000 likes</button>
                </div>
                <div>
                    <button className='p-button-span p-label-view-comment h-mt-10'>View all comment</button>
                </div>
            </CardContent>

            <CardActions className='b-comment-box'>
                <Emoji message={message} setMessage={setMessage} />
                <input
                    placeholder='Bình luận...'
                    className='p-input-comment'
                    value={message}
                    onChange={(event) => setMessage(event.currentTarget.value)} />
                <button
                    className='p-button-span h-mr-24 p-btn-post'
                    disabled={message === ''}>
                    Post
                </button>
            </CardActions>
        </Card>
    )
}