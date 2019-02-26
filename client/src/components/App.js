import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
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
        <div style={styles.container}>
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
          <div style={styles.pageContainer}>
            <Route exact path="/" component={Landing} />
            <Route path="/places" component={DetailView} />
          </div>
          <Footer style={{ position: "absolute", bottom: 0 }}>
            This is Footer
          </Footer>
        </div>
      </BrowserRouter>
    );
  }
}
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  pageContainer: {
    width: "90%",
    maxWidth: "800px",
    margin: "10vh 0"
  }
};

export default App;
