import React, { Component } from "react";
import axios from "axios";
import styled from "styled-components";
import { Icon } from "antd";
import {
  Paper,
  InputBase,
  Card,
  CardContent,
  Typography
} from "@material-ui/core";

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
          <SearchBox elevation={1}>
            <InputBase
              placeholder="상호명 검색"
              onChange={this.handleTextChange}
            />
            <SearchButton
              type="search"
              onClick={() => this.handleClick(this.state.searchText)}
            />
          </SearchBox>
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

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Box = styled.div`
  margin: 2vh 0;
`;

const ListItem = styled(Card)`
  width: 80vw;
  //   border: 1px solid #bbb;
  //   border-radius: 5px;
  margin: 2vh 0;
  //   padding: 2vw;
`;

const SearchBox = styled(Paper)`
  padding: 1vh 2vw;
`;

const SearchButton = styled(Icon)`
    padding: 10px;
    border-radius: 10px;
    cursor: pointer;
    :hover {
    transition: .2s ease-in-out
    color: #0066cc;
    background: #e7e7e7;
  }
`;

const Anchor = styled.a`
  text-decoration: none;
`;

export default AddPlace;
