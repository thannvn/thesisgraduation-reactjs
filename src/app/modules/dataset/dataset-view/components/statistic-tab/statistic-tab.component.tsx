import React from 'react'
import { ColumnInfo } from 'api/file-api';
import 'app/modules/dataset/dataset-view/css/statistic-tab.scss'
import ColumnChart from './column-chart.component';

interface AnalysisTabProps {
  value: number,
  index: number,
  columns: Array<ColumnInfo>
}

export default function AnalysisTab(props: AnalysisTabProps) {
  const { value, index, columns } = props

  return (
    <div hidden={value !== index} className='b-analysis-tab'>
      {columns.map((column, index) =>
        <ColumnChart
          key={index}
          columnInfo={column}
        />
      )}
    </div>
  )
}