import { InputAdornment, TextField } from '@material-ui/core'
import { Search } from '@material-ui/icons'
import React from 'react'
import styled from "styled-components";


interface SearchFieldProps {
  placeHolder: string,
  className?: string,
  onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

const StyledTextField = styled(TextField)`
  .MuiOutlinedInput-root {
    border-radius: 10px;
  }
`;

export default function SearchField({ onChange, placeHolder, className }: SearchFieldProps) {
  return (
    <StyledTextField
      type="search"
      fullWidth
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