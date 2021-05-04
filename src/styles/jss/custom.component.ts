import styled from "styled-components";
import { Menu, Paper, Typography } from "@material-ui/core";

//Style paper
const StyledPaper = styled(Paper)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: auto;
  height: auto;
  padding: 40px;
  background: #f7f7f7;
`;

//Style normal text
const StyledTypography = styled(Typography)`
  font-size: 1rem;
  margin-top: 16px;
  margin-bottom: 16px;
  font-style: italic;
`;

//Style notify when validate input: username, password, email...
const StyledValidate = styled(Typography)`
  font-style: italic;
  margin-left: 2px;
  font-size: 0.85rem;
  color: red;
`;

const StyledMenu = styled(Menu)`
  paper {
    border: 1px solid red;
  }
`
export { StyledPaper, StyledTypography, StyledValidate, StyledMenu };
