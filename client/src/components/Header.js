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
        <h3 style={headerText}>우리동네 가성비 밥상</h3>
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
    width: "100%",
    maxWidth: "800px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  headerText: {
    margin: "3vh 3vw 0 0"
  },
  searchBox: {
    width: "30vw",
    margin: 0
  }
};

export default Header;
