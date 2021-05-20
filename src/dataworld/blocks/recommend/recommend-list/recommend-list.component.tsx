import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@material-ui/core'
import { ExpandMore, StarsOutlined } from '@material-ui/icons'
import RecommendPost from '../recommend-post/recommend-post.component'
import './recommend-list.scss'
import React from 'react'

export default function RecommendList() {
  const array = [{ a: 1 }, { a: 2 }, { a: 3 }]

  return (
    <Accordion expanded={true} className='b-recommend-list'>
      <AccordionSummary
        className='p-summary'
        expandIcon={<ExpandMore />}
        id='description'
      >
        <Typography className='h-d_flex'>
          <StarsOutlined />

          <span className='h-ml-4'>Gợi ý của bạn</span>
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