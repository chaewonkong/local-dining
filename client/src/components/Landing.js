import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import styled from "styled-components";
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

  render() {
    return (
      <Container>
        <RenderedMap />
        <ListContainer>
          <div>
            <Link to="/places/add">
              <button>네이버 검색</button>
            </Link>
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
