import {
  Accordion,
  AccordionDetails,
  AccordionSummary,

  Typography
} from '@material-ui/core'
import { StarsOutlined } from '@material-ui/icons'
import CommonAPI from 'api/common-api'
import React, { useEffect } from 'react'
import RecommendPost from '../recommend-post/recommend-post.component'
import './recommend-list.scss'

export default function RecommendList() {
  const array = [{ a: 1 }, { a: 2 }, { a: 3 }, { a: 1 }, { a: 1 }, { a: 1 }, { a: 1 }, { a: 1 }, { a: 1 }, { a: 1 }]

  const handleViewAllRecommend = () => {
    console.log('view all')
  }

  useEffect(() => {
    async function getRecommendList() {
      const result = await CommonAPI.getRecommendList()
      console.log(result)
    }
    getRecommendList()
  }, [])

  return (
    <Accordion expanded={true} className='b-recommend-list'>
      <AccordionSummary
        className='p-summary'
        style={{ cursor: 'default' }}
        id='description'
      >
        <Typography className='-align-center h-d_flex' >
          <StarsOutlined />

          <span className='h-ml-4 f-weight-700'>Gợi ý của bạn</span>
        </Typography>

        <Typography
          className='f-weight-700 -cursor-pointer'
          onClick={handleViewAllRecommend}
        >
          Xem tất cả
        </Typography>
      </AccordionSummary>
      <AccordionDetails className='b-details' >
        <ul className='b-list'>
          {array.map((item, index) =>
            <li className='b-item' key={index}>
              <RecommendPost key={index} isLoading={false} />
            </li>
          )}
        </ul>
      </AccordionDetails>
    </Accordion>
  )
}