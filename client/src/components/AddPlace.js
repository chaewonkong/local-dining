import React, { Component } from "react";
import axios from "axios";
import styled from "styled-components";
import { Column, Header } from "./common";
import Search from "./Search";
import ListView from "./ListView";

class AddPlace extends Component {
  state = { searchText: "", searchResults: [] };

  handleClick = () => {
    const text = this.state.searchText;
    axios.get(`/api/search?query=${text}`).then(res => {
      const searchResults = res.data.map(item => {
        const { name, address, id, category, lat, lng, phone } = item;
        return { name, address, id, category, lat, lng, phone };
      });
      this.setState({ searchResults });
    });
  };

  handleTextChange = e => {
    this.setState({ searchText: e.target.value });
  };

  render() {
    return (
      <Container>
        <Header title="착한밥집 추가하기" />

        <SearchBox>
          <Search
            elevation={1}
            placeholder="상호명을 검색해 주세요"
            onChange={this.handleTextChange}
            onClick={() => this.handleClick()}
          />
        </SearchBox>
        <ListBox>
          {this.state.searchResults.length ? (
            <ListView data={this.state.searchResults} />
          ) : null}
        </ListBox>
      </Container>
    );
  }
}

const Container = styled(Column)`
  width: 100%;
`;

const SearchBox = styled.div`
  margin: 3vh 0;
  display: flex;
  justify-content: center;
`;

const ListBox = styled.div`
  width: 90%;
`;

export default AddPlace;
