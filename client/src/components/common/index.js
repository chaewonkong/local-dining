import styled from "styled-components";
import { Paper } from "@material-ui/core";
import { Icon } from "antd";
import theme from "./theme";

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
