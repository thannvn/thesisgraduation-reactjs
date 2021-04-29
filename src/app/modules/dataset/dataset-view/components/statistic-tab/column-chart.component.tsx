import React, { useMemo, useState } from 'react';
import { MenuItem, Select, Typography } from '@material-ui/core';
import { ColumnInfo } from 'api/file-api';
import { icons } from 'app/modules/dataset/_common/column-icons.const';
import { COLUMN_TYPE } from 'app/modules/dataset/_common/column-type.const';
import 'app/modules/dataset/dataset-view/css/column-chart.scss';
import Parser from 'html-react-parser';
import _ from 'lodash';
import Chart from 'react-apexcharts';

interface ColumnChartProps {
  columnInfo: ColumnInfo
}

export default function ColumnChart({ columnInfo }: ColumnChartProps) {
  const [numberOfColumn, setNumberOfColumn] = useState<number>(2)
  const [typeChart, setTypeChart] = useState<any>('bar')

  const isHidden = !columnInfo.analysis.countTimeValueAppear || columnInfo.type === COLUMN_TYPE.ID ||
    (columnInfo.type !== COLUMN_TYPE.NUMBER &&
      Object.keys(columnInfo.analysis.countTimeValueAppear).length > 10)

  //replace all '\\u002e' to '.'
  const replaceValue = (value: string) => {
    return _.replace(value, /\\u002e/g, '.')
  }

  const chartConfig = useMemo(() => {
    if (!isHidden) {
      const categories: Array<any> = [];
      const data: Array<any> = []
      const keys = Object.keys(columnInfo.analysis.countTimeValueAppear)
      //if column is number or date time 
      if ([COLUMN_TYPE.NUMBER, COLUMN_TYPE.DATE_TIME].includes(columnInfo.type)
        && keys.length > numberOfColumn) {

        const chunkedArray = splitToChunks(keys, numberOfColumn)
        chunkedArray.forEach((childArray) => {
          let count: number = 0
          const childLength: number = childArray.length
          childArray.forEach(item => count += columnInfo.analysis.countTimeValueAppear[item])
          const category: string = `${replaceValue(childArray[0])} ${childLength > 1 ?
            ` - ${replaceValue(childArray[childLength - 1])}` : null}`

          data.push(count)
          categories.push(category)
        });
      } else {
        keys.forEach(key => {
          data.push(columnInfo.analysis.countTimeValueAppear[key])
          categories.push(replaceValue(key))
        })
      }

      if (typeChart !== 'donut') {
        return {
          options: {
            chart: {
              id: "basic-chart",
              toolbar: {
                show: false,
              }
            },
            xaxis: {
              categories: categories,
              labels: {
                show: false,
              }
            }
          },
          series: [
            {
              name: "Số lượng",
              data: data,
            }
          ]
        }
      }

      return {
        options: { labels: categories },
        series: data,
      }
    }

  }, [columnInfo, numberOfColumn, typeChart, isHidden])

  const validChartConfig = useMemo(() => {
    const data = []
    data.push(columnInfo.analysis.valid)
    data.push(columnInfo.analysis.missing)
    data.push(columnInfo.analysis.wrongType)
    const labels = ['Hợp lệ', 'Bỏ trống', 'Sai kiểu giá trị']
    return {
      options: {
        labels: labels,
        colors: ['#4caf50', '#fd0000', '#feb019'],
      },
      series: data,
    }
  }, [columnInfo])

  //split array to n part
  function splitToChunks(array: Array<any>, parts: number) {
    let result = [];
    for (let i = parts; i > 0; i--) {
      result.push(array.splice(0, Math.ceil(array.length / i)));
    }
    return result;
  }

  const changeNumberOfColumn = (event: React.ChangeEvent<{ value: unknown }>) => {
    setNumberOfColumn(event.target.value as number)
  }

  const changeTypeChart = (event: React.ChangeEvent<{ value: unknown }>) => {
    setTypeChart(event.target.value as any)
  }

  const convertFloatToPercentage = (number: number) => {
    return `${number * 100}%`
  }

  return (
    <div className='b-column-chart h-d_flex h-mt-20'>
      <div className='b-chart'>
        <div className='h-d_flex -justify-space-between'>
          <div className='h-d_flex -align-center h-ml-16'>
            {icons[columnInfo.type]}
            <Typography className='f-weight-700'>{columnInfo.name}</Typography>
          </div>

          {columnInfo.type === COLUMN_TYPE.NUMBER &&
            <Select
              id="select-number-of-column"
              variant='outlined'
              className='h-mr-8'
              value={numberOfColumn}
              onChange={changeNumberOfColumn}
            >
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={6}>6</MenuItem>
              <MenuItem value={7}>7</MenuItem>
              <MenuItem value={8}>8</MenuItem>
              <MenuItem value={9}>9</MenuItem>
              <MenuItem value={10}>10</MenuItem>
            </Select>
          }
        </div>

        <div className='h-d_flex -justify-space-between -align-center'>
          <div className='p-column-description h-ml-16'>
            {
              Parser(columnInfo.description ?
                columnInfo.description :
                `<p class='p-gray-color-typography'>Chưa có mô tả cột</p>`)
            }
          </div>

          {/* {!isHidden &&
            <Select
              id="select-number-of-column"
              variant='outlined'
              className='h-mr-8 p-select-chart'
              value={typeChart}
              onChange={changeTypeChart}
            >
              <MenuItem value='line'>Biểu đồ đường</MenuItem>
              <MenuItem value='donut'>Biểu đồ tròn</MenuItem>
              <MenuItem value='bar'>Biểu đồ cột</MenuItem>
              <MenuItem value='area'>Biểu đồ địa lý</MenuItem>
            </Select>
          } */}
        </div>

        {isHidden ?
          <div className='h-ml-16'>
            <Typography className='f-weight-700 -blue-color'>{columnInfo.analysis.unique} giá trị khác nhau</Typography>
            <div className='h-d_flex -justify-space-between h-mt-20'>
              <Typography variant='body2'>{columnInfo.analysis.mostFrequently}</Typography>
              <Typography variant='body2' className='-blue-color'>
                {convertFloatToPercentage(columnInfo.analysis.percentageMostFrequently)}
              </Typography>
            </div>
            <div className='h-d_flex -justify-space-between h-mt-20'>
              <Typography variant='body2'>Giá trị khác</Typography>
              <Typography variant='body2' className='-blue-color'>
                {convertFloatToPercentage(1 - columnInfo.analysis.percentageMostFrequently)}
              </Typography>
            </div>
          </div> :
          <Chart
            options={chartConfig?.options}
            series={chartConfig?.series}
            type={typeChart}
            width="400"
          />
        }
      </div>

      <div className='b-chart-info h-mb-20'>
        <Chart
          options={validChartConfig.options}
          series={validChartConfig.series}
          type='donut'
          width='295'
          height='295'
        />
        <div className='h-ml-32 '>
          <div className='h-d_flex -justify-space-between h-mt-2'>
            <Typography variant='body2'>Hợp lệ</Typography>
            <Typography variant='body2'>{columnInfo.analysis.valid}</Typography>
          </div>

          <div className='h-d_flex -justify-space-between h-mt-2'>
            <Typography variant='body2'>Bỏ trống</Typography>
            <Typography variant='body2'>{columnInfo.analysis.missing}</Typography>
          </div>

          {columnInfo.type !== COLUMN_TYPE.NUMBER &&
            <>
              <div className='h-d_flex -justify-space-between h-mt-2'>
                <Typography variant='body2'>Sai kiểu giá trị</Typography>
                <Typography variant='body2'>{columnInfo.analysis.wrongType}</Typography>
              </div>

              <div className='h-d_flex -justify-space-between h-mt-2'>
                <Typography variant='body2'>Duy nhất</Typography>
                <Typography variant='body2'>{columnInfo.analysis.unique}</Typography>
              </div>
            </>
          }

          <div className='h-d_flex -justify-space-between h-mt-2'>
            <Typography variant='body2'>Xuất hiện nhiều nhất</Typography>
            <Typography variant='body2'>{columnInfo.analysis.mostFrequently}</Typography>
          </div>

          {columnInfo.type === COLUMN_TYPE.NUMBER &&
            <>
              <div className='h-d_flex -justify-space-between h-mt-10'>
                <Typography variant='body2'>Phương sai</Typography>
                <Typography variant='body2'>{columnInfo.analysis.variance}</Typography>
              </div>

              <div className='h-d_flex -justify-space-between h-mt-2'>
                <Typography variant='body2'>Độ lệch chuẩn</Typography>
                <Typography variant='body2'>{columnInfo.analysis.standardDeviation}</Typography>
              </div>

              <div className='h-d_flex -justify-space-between h-mt-10'>
                <Typography variant='body2'>Giá trị lớn nhất</Typography>
                <Typography variant='body2'>{columnInfo.analysis.max}</Typography>
              </div>

              <div className='h-d_flex -justify-space-between h-mt-2'>
                <Typography variant='body2'>Giá trị trung bình</Typography>
                <Typography variant='body2'>{columnInfo.analysis.mean}</Typography>
              </div>

              <div className='h-d_flex -justify-space-between h-mt-2'>
                <Typography variant='body2'>Giá trị nhỏ nhất</Typography>
                <Typography variant='body2'>{columnInfo.analysis.min}</Typography>
              </div>

              <div className='h-d_flex -justify-space-between h-mt-10'>
                <Typography variant='body2'>Tứ phân vị</Typography>
              </div>

              <div className='h-d_flex -justify-space-between h-mt-2 h-ml-10'>
                <Typography variant='body2' className='p-gray-color-typography h-ml-32'>25%</Typography>
                <Typography variant='body2'>{columnInfo.analysis.quartile.q1}</Typography>
              </div>

              <div className='h-d_flex -justify-space-between h-mt-2 h-ml-10'>
                <Typography variant='body2' className='p-gray-color-typography h-ml-32'>50%</Typography>
                <Typography variant='body2'>{columnInfo.analysis.quartile.q2}</Typography>
              </div>

              <div className='h-d_flex -justify-space-between h-mt-2 h-ml-10'>
                <Typography variant='body2' className='p-gray-color-typography h-ml-32'>75%</Typography>
                <Typography variant='body2'>{columnInfo.analysis.quartile.q3}</Typography>
              </div>
            </>
          }
        </div>
      </div>
    </div>
  )
}