import React from "react";
import styled from "styled-components";
import { Paper } from "@material-ui/core";
import { Icon } from "antd";

export const Anchor = styled.a`
  text-decoration: none;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const SearchBox = styled(Paper)`
  min-width: 30vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1vh 2vw;
`;

export const SearchButton = styled(Icon)`
    padding: 10px;
    border-radius: 10px;
    cursor: pointer;
    :hover {
    transition: .2s ease-in-out
    color: ${props => props.theme.mainColor}
    background: ${props => props.theme.secondaryColor}
  }
`;

export const Header = props => (
  <HeaderContainer>
    <Inner>
      {props.left ? (
        props.left
      ) : (
        <Icon type="left" onClick={() => (window.location.href = "/")} />
      )}
      <h1>{props.title}</h1>
      {props.right ? props.right : <Icon type="right" />}
    </Inner>
  </HeaderContainer>
);

const Inner = styled.div`
  width: 90%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeaderContainer = styled.div`
  padding: 1.5vh 0;
  align-items: center;
  width: 100%;
  display: flex;
  justify-content: center;
  border-bottom: 1px solid #e7e7e7;
  background: #fff;
`;
