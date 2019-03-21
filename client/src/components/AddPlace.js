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
    axios
      .get(`/api/search?query=${text}`, {
        headers: {
          "X-Naver-Client-Id": "Cr_kJzv0CHomc2Oa22Mu",
          "X-Naver-Client-Secret": "bOT4DsTAPY"
        }
      })
      .then(res =>
        this.setState({
          searchResults: res.data.items.map(item => {
            return {
              ...item,
              title: item.title
                .split("<b>")
                .join("")
                .split("</b>")
                .join(""),
              category: item.category.split(">").join(" / ")
            };
          })
        })
      );
  };

  handleTextChange = e => {
    this.setState({ searchText: e.target.value });
  };

  handleCreatePlace = item => {
    const { title, lat, lng, address } = item;
    // axios
    //   .post("/api/places", {
    //     name: title,
    //     geometry: {
    //       type: "Point",
    //       coordinates: [lng, lat]
    //     },
    //     address
    //   })
    //   .then(res => console.log(res));
    // 현재 geoTrans가 결과 값으로 제공하는 좌표는 부정확한 좌표로 약 0.5km 오차가 존재
  };

  renderResult = () => {
    const results = this.state.searchResults;
    return results.map(result => {
      const {
        roadAddress,
        category,
        description,
        link,
        lat,
        lng,
        telephone,
        title
      } = result;
      let t = title;
      t = t
        .split("<b>")
        .join("")
        .split("</b>")
        .join("");
      return (
        <ListItem key={results.indexOf(result)}>
          <CardContent>
            <Typography color="textSecondary">
              {category.split(">").join(" / ")}
            </Typography>
            <Typography variant="h5" component="h2">
              {t}
            </Typography>
            <Typography color="textSecondary">{roadAddress}</Typography>
            <Typography color="textSecondary">
              {category.split(">").join(" / ")}
            </Typography>
            <Anchor href={link}>
              <Typography color="textSecondary">{link}</Typography>
            </Anchor>
            <Typography color="textSecondary">전화번호: {telephone}</Typography>
            <Typography color="textSecondary">{description}</Typography>
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
