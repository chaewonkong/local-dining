import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import styled from "styled-components";

class Header extends Component {
  state = {};
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  render() {
    return (
      <Container>
        <HeaderText>우리동네 가성비 밥상</HeaderText>
        <SearchBox
          name="search"
          id="standard-search"
          label="Search field"
          type="search"
          margin="normal"
          onChange={this.handleChange}
        />
      </Container>
    );
  }
}

const Container = styled.div`
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: row;
  justify-content: pace-between;
`;

const HeaderText = styled.h3`
  margin: 3vh 3vw 0 0;
`;

const SearchBox = styled(TextField)`
  width: 30vw;
  margin: 0;
`;

export default Header;
