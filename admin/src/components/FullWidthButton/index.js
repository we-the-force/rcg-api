import styled from 'styled-components';
import { Button as Base } from '@buffetjs/core';

const Button = styled(Base)`
  width: 100%;
  background: ${({ newColor }) => newColor}; 
  border-color: ${({ newColor }) => newColor};
  text-transform: ${({ textTransform }) => textTransform};
`;

Button.defaultProps = {
  color: 'primary',
  type: 'button',
  textTransform: 'none',
};

export default Button;
