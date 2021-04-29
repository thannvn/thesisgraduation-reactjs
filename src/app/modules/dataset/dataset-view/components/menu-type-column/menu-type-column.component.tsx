import React from 'react'
import {
  IconButton,
  Menu,
  MenuItem,
  Typography
} from '@material-ui/core'
import {
  ArrowDropDown
} from '@material-ui/icons'
import { ColumnInfo } from 'api/file-api';
import { options } from 'app/modules/dataset/_common/column-type.const'
import 'app/modules/dataset/dataset-view/css/menu-type-column.scss'
import { icons } from 'app/modules/dataset/_common/column-icons.const'

export interface MenuTypeColumnProps {
  columnInfo: ColumnInfo,
  register: any,
  indexColumn: number,
  columnsType: Array<number>,
  setColumnsType: (columnsType: Array<number>) => void,
}

const ITEM_HEIGHT = 48;

export default function MenuTypeColumn(props: MenuTypeColumnProps) {
  const { columnInfo, register, setColumnsType, columnsType, indexColumn } = props
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedIndex, setSelectedIndex] = React.useState<number>
    (options.findIndex(option => (option.value === columnInfo.type)));

  const handleClickListItem = (event: React.MouseEvent<HTMLElement> | null) => {
    setAnchorEl(event ? event.currentTarget : null);
  };

  const handleMenuItemClick = (event: React.MouseEvent<HTMLElement>, index: number) => {
    const newArrayType = [...columnsType]
    newArrayType[indexColumn] = options[index].value
    setColumnsType(newArrayType)
    setSelectedIndex(index);
    setAnchorEl(null);
  };

  return (
    <div className='b-column'>
      <div className='b-column-title'>
        <div className='p-column-name'>
          {icons[selectedIndex]}
          <Typography>{columnInfo.name}</Typography>
        </div>

        <IconButton
          className=''
          onClick={(event) => handleClickListItem(event)}
        >
          <ArrowDropDown />
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => handleClickListItem(null)}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: '20ch',
            },
          }}
        >
          {options.map((option, index) => (
            <MenuItem
              key={option.value}
              selected={index === selectedIndex}
              onClick={(event) => handleMenuItemClick(event, index)}>
              {icons[index]}
              {option.label}
            </MenuItem>
          ))}
        </Menu>
      </div>

      <textarea
        defaultValue={columnInfo.description}
        className='p-text-area h-mt-12'
        name={columnInfo.name}
        ref={register}
      />
    </div>
  )
}