import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import { Layout } from "antd";
import Landing from "./Landing";
import DetailView from "./DetailView";
import AddPlace from "./AddPlace";
import Header from "./Header";
import { Row } from "./common";
import theme from "./common/theme";
import "../App.css";

const { Footer } = Layout;

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Row>
            {/* <PageHeader>This is Header</PageHeader> */}
            <Route exact path="/" component={Landing} />
            <Route exact path="/places" component={DetailView} />
            <Route path="/places/add" component={AddPlace} />
            {/* <PageFooter>This is Footer</PageFooter> */}
          </Row>
        </ThemeProvider>
      </BrowserRouter>
    );
  }
}

export default App;
