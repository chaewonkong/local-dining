import React, { Component } from "react";
import axios from "axios";
import styled from "styled-components";
import { InputBase, Card, CardContent, Typography } from "@material-ui/core";
import { Column, SearchBox, SearchButton } from "./common";
import Search from "./Search";

class AddPlace extends Component {
  state = { searchText: "", searchResults: [] };

  handleClick = text => {
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

  handleCreatePlace = item => {
    const { name, lat, lng, address } = item;
    axios
      .post("/api/places", {
        name,
        geometry: {
          type: "Point",
          coordinates: [lng, lat]
        },
        address
      })
      .then(res => console.log(res));
  };

  renderResult = () => {
    const results = this.state.searchResults;
    return results.map(result => {
      const { address, category, lat, lng, phone, name } = result;
      return (
        <ListItem key={results.indexOf(result)}>
          <CardContent>
            <Typography color="textSecondary">
              {category.split(">").join(" / ")}
            </Typography>
            <Typography variant="h5" component="h2">
              {name}
            </Typography>
            <Typography color="textSecondary">{address}</Typography>
            <Typography color="textSecondary">전화번호: {phone}</Typography>
            <Typography color="textSecondary">
              위도: {lat} / 경도: {lng}
            </Typography>
            <button onClick={() => this.handleCreatePlace(result)}>
              등록하기
            </button>
          </CardContent>
        </ListItem>
      );
    });
  };
  render() {
    return (
      <Container>
        <Box>
          <Search
            elevation={1}
            placeHolder="상호명 검색"
            onChange={this.handleTextChange}
            onClick={() => this.handleClick(this.state.searchText)}
          />
        </Box>
        <Box>
          {this.state.searchResults.length ? (
            this.renderResult()
          ) : (
            <p>상호명을 검색해 주세요</p>
          )}
        </Box>
      </Container>
    );
  }
}

const Container = styled(Column)`
  width: 100%;
`;

const Box = styled.div`
  margin: 2vh 0;
`;

const ListItem = styled(Card)`
  width: 80vw;
  margin: 2vh 0;
`;

export default AddPlace;
