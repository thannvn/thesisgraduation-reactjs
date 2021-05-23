import {
  Accordion,
  AccordionDetails,
  AccordionSummary,

  Typography
} from '@material-ui/core'
import { StarsOutlined } from '@material-ui/icons'
import { Skeleton } from '@material-ui/lab'
import CommonAPI from 'api/common-api'
import { DatasetValues } from 'api/dataset-api'
import React, { useEffect, useState } from 'react'
import RecommendPost from '../recommend-post/recommend-post.component'
import './recommend-list.scss'

export default function RecommendList() {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [recommendList, setRecommendList] = useState<Array<DatasetValues>>([])

  const handleViewAllRecommend = () => {
    console.log('view all')
  }

  useEffect(() => {
    async function getRecommendList() {
      const result = await CommonAPI.getRecommendList()
      console.log(result)
      setRecommendList(result.data)
      setIsLoading(false)
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
        {isLoading ?
          <Skeleton width={150} height={20} /> :
          <Typography className='-align-center h-d_flex' >
            <StarsOutlined />

            <span className='h-ml-4 f-weight-700'>Gợi ý của bạn</span>
          </Typography>
        }

        {isLoading ?
          <Skeleton width={100} height={20} /> :
          <Typography
            className='f-weight-700 -cursor-pointer'
            onClick={handleViewAllRecommend}
          >
            Xem tất cả
          </Typography>
        }
      </AccordionSummary>

      <AccordionDetails className='b-details' >
        <ul className='b-list'>
          {recommendList.map((item, index) =>
            <li className='b-item' key={index}>
              <RecommendPost dataset={item} isLoading={isLoading} />
            </li>
          )}
        </ul>
      </AccordionDetails>
    </Accordion>
  )
}