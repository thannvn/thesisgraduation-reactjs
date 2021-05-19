import React from 'react';
import {
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography
} from '@material-ui/core';
import { LockOutlined, PublicOutlined } from '@material-ui/icons';
import { Controller } from 'react-hook-form';
import 'app/modules/dataset/dataset-create/css/dataset-select-visibility.scss';
import { DatasetVisibility } from '../../_common/common.const';


interface DatasetSelectVisibilityProps {
  control: any,
}

export default function DatasetSelectVisibility(props: DatasetSelectVisibilityProps) {
  const { control } = props

  return (
    <div className='h-mt-12 p-bottom-border h-mb-32'>
      <Controller
        control={control}
        name="visibility"
        as={
          <RadioGroup
            aria-label="dataset-visibility"
          >
            <FormControlLabel
              value={DatasetVisibility.PUBLIC_DATASET.toString()}
              control={<Radio />}
              label={
                <div className='p-select-visibility '>
                  <PublicOutlined color='primary' fontSize='large' className='h-mt-6' />
                  <div className='h-ml-6'>
                    <Typography>Cộng đồng</Typography>
                    <Typography className='p-explain-visibility p-gray-color-typography'>
                      Bất kỳ ai đều có quyền truy cập và xem dataset
                    </Typography>
                  </div>
                </div>
              } />
            <FormControlLabel
              className='h-mt-16'
              value={DatasetVisibility.PRIVATE_DATASET.toString()}
              defaultChecked
              control={<Radio />}
              label={
                <div className='p-select-visibility'>
                  <LockOutlined color='action' fontSize='large' className='h-mt-6' />
                  <div className='h-ml-6'>
                    <Typography>Cá nhân</Typography>
                    <Typography className='p-explain-visibility p-gray-color-typography'>
                      Chỉ người tạo có quyền truy cập và xem dataset
                    </Typography>
                  </div>
                </div>
              } />
          </RadioGroup>}
      />
    </div>
  )
}

