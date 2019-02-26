import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";

class Header extends Component {
  state = {};

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  render() {
    const { container, headerText, searchBox } = styles;
    return (
      <div style={container}>
        <h1 style={headerText}>우리동네 가성비 밥상</h1>
        <TextField
          style={searchBox}
          name="search"
          id="standard-search"
          label="Search field"
          type="search"
          margin="normal"
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  headerText: {
    margin: "3vh 0 0 0"
  },
  searchBox: {
    width: "100%",
    margin: 0
  }
};

export default Header;
