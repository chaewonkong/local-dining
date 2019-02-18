import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Layout } from "antd";
import Landing from "./Landing";
import DetailView from "./DetailView";
import Header from "./Header";
import "../App.css";

const { Footer, Content } = Layout;

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Header
            style={{
              position: "fixed",
              zIndex: 1,
              width: "100%",
              background: "#fff",
              height: 64
            }}
          >
            This is Header
          </Header>
          <Content style={{ paddingTop: "64px" }}>
            <Route exact path="/" component={Landing} />
            <Route path="/places" component={DetailView} />
          </Content>
          <Footer style={{ position: "absolute", bottom: 0 }}>
            This is Footer
          </Footer>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
