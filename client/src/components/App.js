import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import styled from "styled-components";
import { Layout } from "antd";
import Landing from "./Landing";
import DetailView from "./DetailView";
import Header from "./Header";
import "../App.css";

const { Footer } = Layout;

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Container>
          {/* <PageHeader>This is Header</PageHeader> */}
          <Route exact path="/" component={Landing} />
          <Route path="/places" component={DetailView} />
          {/* <PageFooter>This is Footer</PageFooter> */}
        </Container>
      </BrowserRouter>
    );
  }
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const PageFooter = styled(Footer)`
  position: absolute;
  bottom: 0;
`;

const PageHeader = styled(Header)`
  position: fixed;
  z-index: 1;
  width: 100%;
  background-color: #fff;
  height: 64;
`;

export default App;
