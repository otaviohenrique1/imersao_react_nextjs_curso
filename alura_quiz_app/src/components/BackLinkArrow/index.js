/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  font-size: 20px;
  background-color: #007bff;
  color: #ffffff;
`;

export default function BackLinkArrow({ ...props }) {
  return (
    <Button {...props}>{'<='}</Button>
  );
}
