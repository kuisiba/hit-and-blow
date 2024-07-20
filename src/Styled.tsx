import { Card, Input, Button, Form } from "antd";
import styled from "styled-components";

export const StyledFormItem = styled(Form.Item)`
  margin-bottom: 8px;
`;

export const StyledCard = styled(Card)`
  width: 300px;
  margin: 0 auto;
  margin-top: 100px;
  background-color: #2E3553;
`;

export const StyledInput = styled(Input)`
  border: 1px solid white;
  &::placeholder {
    text-align: center;
  }
`;

export const StyledButton = styled(Button)`
  background-color: #44a54d;
  color: white;
  width: 100%;
`;

export const StyledDiv = styled.div`
  background-color: ${({ color }) => color};
  color: white;
  margin-top: 8px;
`;
