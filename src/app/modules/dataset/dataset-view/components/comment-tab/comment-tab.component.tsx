import React, { useContext, useEffect, useState } from 'react'
import { Avatar, Button, Typography } from '@material-ui/core'
import {
  ArrowDropDown
} from '@material-ui/icons'
import CommentAPI, { Comment, commentDefault } from 'api/comment-api'
import { STATUS_OK } from 'services/axios/common-services.const'
import 'app/modules/dataset/dataset-view/css/comment-tab.scss'
import CommentPost from 'dataworld/blocks/comment-post/comment-post.component'
import TinyMCEEditor from 'dataworld/blocks/tinymce-editor/tinymce-editor.component'
import { useSelector } from 'react-redux'
import { RootState } from 'store'
import { DatasetViewContext } from '../../pages/context.component'
import { TabProps } from '../dataset-tab/dataset-tab.component'

export default function CommentTabTemplate({ index, value }: TabProps) {
  const { datasetValues, handleChangeComment } = useContext(DatasetViewContext)
  const [comment, setComment] = useState<string>('')
  const user = useSelector((state: RootState) => state.auth.user)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [reply, setReply] = useState<number | null>(null)
  const [listComment, setListComment] = useState<Array<Comment>>(Array(4).fill(commentDefault))

  const postComment = async () => {
    const result = await CommentAPI.postComment(datasetValues.dataset._id, comment, reply ? listComment[reply]._id : '')
    if (result.status === STATUS_OK) {
      setListComment([
        ...listComment,
        result.data
      ])
      setComment('')
      handleChangeComment(true)
    }
  }

  const handleChangeLike = (index: number, isLike: boolean) => {
    let tempComment = [...listComment]
    isLike ? tempComment[index].countLike++ : tempComment[index].countLike--
    tempComment[index].like = isLike ? [...tempComment[index].like, user.accountId] :
      tempComment[index].like.filter(id => id !== user.accountId)
    setListComment(tempComment)
  }

  const handeUpdateComment = (index: number) => {
    let tempContent = [...listComment]
    tempContent[index].lastUpdate = Date.now()
    setListComment(tempContent)
  }

  const handleDeleteComment = (index: number) => {
    setListComment((prevState) => (prevState.filter((item, indexItem) => index !== indexItem)))
    handleChangeComment(false)
  }

  useEffect(() => {
    async function getComments() {
      const result = await CommentAPI.getAllCommentInDataset(datasetValues.dataset._id)
      setListComment(result.data)
      setIsLoading(false)
    }

    if (datasetValues.dataset._id !== '' && value === index) getComments()
  }, [datasetValues.dataset._id, value, index])

  return (
    <div
      id='t-comment-tab'
      className='t-comment-tab h-mt-32'
      hidden={index !== value}
    >
      <div className='b-info-options'>
        <Button
          startIcon={<ArrowDropDown />}
        >
          Mới nhất
        </Button>
      </div>

      <div className='b-list-comment'>
        {listComment.map((comment, index) =>
          <CommentPost
            accountId={user.accountId}
            authorId={datasetValues.accountId}
            key={index}
            index={index}
            comment={comment}
            isLoading={isLoading}
            setReply={setReply}
            handleDeleteComment={handleDeleteComment}
            handleChangeLike={handleChangeLike}
            handleUpdateComment={handeUpdateComment}
          />
        )}
      </div>

      {!isLoading &&
        <div className='b-post-comment h-d_flex'>
          <div className='-cursor-pointer'>
            <Avatar
              aria-label="avatar"
              src={user.avatar}
            />
          </div>

          <div className='p-input-comment h-ml-10' id='tiny-editor'>
            <div className='p-title' >
              <Typography variant='body2' className='p-gray-color-typography h-ml-20' >
                {reply !== null && `>> trả lời @${listComment[reply].commentator.name}`}
              </Typography>
            </div>

            <div className='p-input-area'>
              <TinyMCEEditor
                values={comment}
                height={200}
                setValues={setComment}
              />

              <div className='h-d_flex -justify-flex-end h-mt-10 '>
                <Button
                  variant='contained'
                  size='small'
                  onClick={postComment}
                  disabled={comment === ''}
                  className='p-round-button p-button-save-color '
                >
                  Bình luận
                </Button>
              </div>
            </div>
          </div>
        </div>
      }

    </div>
  )
}