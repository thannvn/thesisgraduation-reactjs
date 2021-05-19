import React, { useEffect, useState } from 'react'
import { Avatar, Button, ButtonGroup, IconButton, Popover, Typography } from '@material-ui/core'
import {
  ThumbUp,
  ThumbUpOutlined,
  MoreHoriz, Reply,
  DeleteOutline, Edit
} from '@material-ui/icons';
import moment from 'moment'
import 'moment/locale/vi'
import Parser from 'html-react-parser'
import CommentAPI, { Comment } from 'api/comment-api';
import { Skeleton } from '@material-ui/lab';
import './comment-post.scss'
import { useHistory } from 'react-router';
import TinyMCEEditor from '../tinymce-editor/tinymce-editor.component';
import clsx from 'clsx';
import ConfirmDialog from '../confirm-dialog/confirm-dialog.component';

interface CommentProps {
  accountId: string,
  authorId: string,
  index: number,
  comment: Comment,
  isLoading: boolean,
  handleUpdateComment: (index: number) => void,
  handleDeleteComment: (index: number) => void,
  handleChangeLike: (index: number, isLike: boolean) => void,
  setReply: (reply: number) => void
}

export default function CommentPost(props: CommentProps) {
  const { comment, isLoading, accountId, index, handleChangeLike,
    authorId, handleUpdateComment, setReply, handleDeleteComment } = props
  const history = useHistory()
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const [like, setLike] = useState<boolean>(false)
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [deleteComment, setDeleteComment] = useState<boolean>(false)
  const [currentCommentContent, setCurrentCommentContent] = useState<string>(comment.content)

  const changeLike = async (isLike: boolean) => {
    await CommentAPI.likeOrUnLikeComment(comment._id)
    handleChangeLike(index, isLike)
  }

  const gotoProfile = (username: string) => {
    history.push(`/profile/${username}`)
  }

  const handleOptions = (event: React.MouseEvent<HTMLElement> | null) => {
    setAnchorEl(event ? event.currentTarget : null)
  }

  const handleEditComment = (isEdit: boolean) => {
    if (anchorEl) setAnchorEl(null)
    if (currentCommentContent !== comment.content) setCurrentCommentContent(comment.content)
    setIsEdit(isEdit)
  }

  const updateComment = async () => {
    await CommentAPI.updateComment(comment._id, currentCommentContent)
    handleUpdateComment(index)
    setIsEdit(false)
  }

  const replyComment = () => {
    const input = document.querySelector("#tiny-editor")
    setReply(index)
    const timeout = setTimeout(() => {
      input?.scrollIntoView()
      clearTimeout(timeout)
    }, 100)
    setAnchorEl(null)
  }

  const handleDeleteDialog = (isOpen: boolean) => {
    if (anchorEl) setAnchorEl(null)
    setDeleteComment(isOpen)
  }

  const acceptDeleteComment = async () => {
    await CommentAPI.deleteComment(comment._id)
    handleDeleteComment(index)
    setAnchorEl(null)
  }

  useEffect(() => {
    const index = comment.like.findIndex(item => item === accountId)
    setLike(index >= 0 ? true : false)
    setCurrentCommentContent(comment.content)

  }, [comment.like, accountId, comment.content])

  return (
    <div className='b-comment-post h-d_flex'>
      <div className='-cursor-pointer'>
        {isLoading ?
          <Skeleton animation="wave" variant="circle" width={40} height={40} /> :
          <Avatar
            onClick={() => gotoProfile(comment.commentator.username)}
            aria-label="avatar"
            src={comment.commentator.avatar}
          />
        }
      </div>

      <div className='b-comment h-ml-12'>
        <div className='p-title'>
          {isLoading ?
            <div className='h-d_flex'>
              <Skeleton width={50} height={10} className='h-ml-20' />
              <Skeleton width={100} height={10} className='h-ml-20' />
            </div> :
            <div className='h-d_flex -justify-space-between'>
              <div className='h-d_flex -align-center'>
                <Typography
                  variant='body2'
                  className='h-ml-20 f-weight-700 -cursor-pointer'
                  onClick={() => gotoProfile(comment.commentator.username)}
                >
                  {comment.commentator.name}
                </Typography>
                <Typography variant="body2" className='h-ml-6 p-gray-color-typography'>
                  Bình luận {moment(comment.lastUpdate).locale('vi').format('MMMM Do YYYY, hh:mm a')}
                </Typography>
              </div>

              <div className='h-d_flex -align-center'>
                {authorId === comment.commentator._id}
                <Typography
                  variant='body2'
                  className='p-gray-color-typography p-author'
                >
                  Tác giả
                </Typography>
                <IconButton className='h-ml-20 h-mr-20' onClick={(event) => handleOptions(event)}>
                  <MoreHoriz />
                </IconButton>

                <Popover
                  open={Boolean(anchorEl)}
                  disableScrollLock
                  onClose={() => handleOptions(null)}
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                >
                  <ButtonGroup
                    variant='outlined'
                    orientation='vertical'
                  >
                    <Button
                      startIcon={<Reply />}
                      onClick={replyComment}
                    >
                      Trả lời
                    </Button>

                    {accountId === comment.commentator._id &&
                      <Button
                        startIcon={<Edit />}
                        onClick={() => handleEditComment(true)}
                      >
                        Chỉnh sửa
                      </Button>
                    }

                    {accountId === comment.commentator._id &&
                      <Button
                        startIcon={<DeleteOutline />}
                        onClick={() => handleDeleteDialog(true)}
                      >
                        Xóa bình luận
                      </Button>
                    }
                  </ButtonGroup>
                </Popover>
              </div>
            </div>
          }
        </div>

        <ConfirmDialog
          open={deleteComment}
          title='Xóa bình luận'
          content='Bạn có chắc chắn muốn xóa bình luận này không?'
          onClose={() => handleDeleteDialog(false)}
          onAccept={acceptDeleteComment}
        />

        <div className='p-comment-content'>
          {comment.parent &&
            <div className='p-reply p-gray-color-typography h-mb-10'>
              <Typography
                className='f-weight-700 -cursor-pointer'
                variant='body2'
                onClick={() => gotoProfile(comment.parent?.commentator.username)}
              >
                @{comment.parent.commentator.name}
              </Typography>
              {Parser(comment.parent.content)}
            </div>
          }

          {isLoading ?
            <>
              <Skeleton width='100%' height={10} />
              <Skeleton width='100%' height={10} />
            </>
            :
            <>
              {isEdit ?
                <TinyMCEEditor
                  values={currentCommentContent}
                  setValues={setCurrentCommentContent}
                  height={200}
                />
                :
                <>
                  {Parser(currentCommentContent)}
                </>
              }
            </>
          }
        </div>

        <div className={clsx({ 'h-d_flex p-actions': true, '-justify-flex-end': isEdit })}>
          {isLoading ?
            <Skeleton width={50} height={30} /> :
            <>
              {isEdit ?
                <div>
                  <Button
                    variant='outlined'
                    size='small'
                    onClick={() => handleEditComment(false)}
                    className='p-round-button'
                  >
                    Hủy
                    </Button>
                  <Button
                    variant='contained'
                    size='small'
                    disabled={currentCommentContent === comment.content}
                    className='p-round-button p-button-save-color h-ml-8'
                    onClick={updateComment}
                  >
                    Cập nhật
                    </Button>
                </div>
                :
                <>
                  {like ?
                    <IconButton onClick={() => changeLike(false)}>
                      < ThumbUp color='primary' />
                    </IconButton> :
                    <IconButton onClick={() => changeLike(true)}>
                      <ThumbUpOutlined />
                    </IconButton>
                  }
                  <Typography variant="body1" className='h-ml-4'>{comment.countLike}</Typography>
                </>
              }
            </>
          }
        </div>
      </div>
    </div >
  )

}