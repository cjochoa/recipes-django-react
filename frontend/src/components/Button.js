import styled from "styled-components";

const Button = styled.button`
  padding: 6px 16px;
  background-color: lavender;
  border-radius: 3px;
  font-size: 20px;
  cursor: pointer;
  color: white;
  text-shadow: 1px 1px rgba(0, 0, 0, 0.3);
  box-shadow: 1px 1px rgba(0, 0, 0, 0.3);
  &:focus,
  &:active {
    outline: none;
  }
`;

export default Button;
