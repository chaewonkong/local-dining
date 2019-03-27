import React from "react";
import styled from "styled-components";
import { Icon } from "antd";
import { Row } from "./common";

const Header = props => {
  return (
    <Row>
      {props.left ? props.left : <Icon type="left" />}
      <h1>{props.title}</h1>
      {props.right ? props.right : <Icon type="right" />}
    </Row>
  );
};

export default Header;
