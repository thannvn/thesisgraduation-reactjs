import { InputAdornment, TextField } from '@material-ui/core'
import { Search } from '@material-ui/icons'
import React from 'react'
import styled from "styled-components";


interface SearchFieldProps {
  placeHolder: string,
  className?: string,
  onChange?: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
  register?: any
}

const StyledTextField = styled(TextField)`
  .MuiOutlinedInput-root {
    border-radius: 15px;
  }
`;

export default function SearchField({
  onChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => { },
  placeHolder,
  className,
  register }: SearchFieldProps) {
  return (
    <StyledTextField
      type="search"
      fullWidth
      name='title'
      inputRef={register}
      onChange={(event) => onChange(event)}
      placeholder={placeHolder}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Search />
          </InputAdornment>
        )
      }}
      className={className}
      variant="outlined"
      size="small"
    />
  )
}