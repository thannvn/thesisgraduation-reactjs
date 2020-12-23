import styled from "styled-components";
import { Button, Paper, Typography } from "@material-ui/core";

//Style buton login, forgot password...
const StyledButton = styled(Button)`
  background: ${(props) => props.color};
  margin-bottom: 20pt;
  color: white;
  &:hover {
    background: ${(props) => props.color};
  }
`;

//Style paper
const StyledPaper = styled(Paper)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 480px;
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
  font-size: 0.9rem;
  color: red;
`;
export { StyledButton, StyledPaper, StyledTypography, StyledValidate };
