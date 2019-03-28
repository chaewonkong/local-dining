import React, { Component } from "react";
import axios from "axios";
import styled from "styled-components";
import { Button } from "antd";
import { Card, CardContent, Typography } from "@material-ui/core";
import { Column, Row, Header } from "./common";
import Search from "./Search";
import ListView from "./ListView";

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
            <Button
              type="primary"
              onClick={() => this.handleCreatePlace(result)}
            >
              등록하기
            </Button>
          </CardContent>
        </ListItem>
      );
    });
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
            onClick={() => this.handleClick(this.state.searchText)}
          />
        </SearchBox>
        <ListBox>
          {this.state.searchResults.length ? (
            // this.renderResult()
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

const ListItem = styled(Card)`
  width: 80vw;
  margin: 2vh 0;
`;

export default AddPlace;
