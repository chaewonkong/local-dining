import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import axios from "axios";
import RenderedMap from "./RenderedMap";

class Landing extends Component {
  state = { places: [] };

  handleNearPlaces = places => {
    this.setState({ places });
  };

  renderPlaces() {
    const places = this.props.places;
    return places.map(place => {
      return (
        <div key={place._id}>
          <h1>{place.name}</h1>
          <p>{place.address}</p>
          <p>평균 {place.avgPrice}원</p>
        </div>
      );
    });
  }

  handleClick = () => {
    axios
      .get("/api/search?query=서양가트니", {
        headers: {
          "X-Naver-Client-Id": "Cr_kJzv0CHomc2Oa22Mu",
          "X-Naver-Client-Secret": "bOT4DsTAPY"
        }
      })
      .then(res => console.log(res));
    // axios
    //   .get(
    //     "https://chaewonkong.github.io",
    //     {},
    //     {
    //       headers: { "X-Naver-Client-Id": "a", "X-Naver-Client-Secret": "b" }
    //     }
    //   )
    //   .then(res => console.log(res));
  };

  render() {
    return (
      <Container>
        <RenderedMap />
        <ListContainer>
          <div>
            <button onClick={this.handleClick}>네이버 검색</button>
          </div>
          <div>{this.renderPlaces()}</div>
        </ListContainer>
      </Container>
    );
  }
}

const Container = styled.div`
  display: flex;
`;

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const mapStateToProps = state => state;

export default connect(mapStateToProps)(Landing);
