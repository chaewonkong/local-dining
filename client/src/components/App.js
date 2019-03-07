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
          <PageHeader>This is Header</PageHeader>
          <PageContainer>
            <Route exact path="/" component={Landing} />
            <Route path="/places" component={DetailView} />
          </PageContainer>
          <PageFooter>This is Footer</PageFooter>
        </Container>
      </BrowserRouter>
    );
  }
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PageContainer = styled.div`
  width: 90%;
  max-width: 800px;
  margin: 3vh 0;
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
