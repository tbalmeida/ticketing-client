import styled from "@emotion/styled";

const SubmitButton = styled.button`
  display: block;
  height: 40px;
  width: 100%;
  font-size: inherit;
  background-color: ${props => (props.disabled ? "#e8e8e8" : "#e8e8e8")};
  box-shadow: ${props =>
    props.disabled
      ? "none"
      : "0 6px 9px rgba(50, 50, 93, 0.06), 0 2px 5px rgba(0, 0, 0, 0.08)"};
  border-radius: 4px;
  opacity: ${props => (props.disabled ? 0.5 : 1)};
  color: #black;
  font-weight: 600;
  cursor: pointer;
`;

export default SubmitButton;
