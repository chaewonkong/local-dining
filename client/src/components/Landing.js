import React, { Component } from "react";
import styled from "styled-components";
import axios from "axios";
import MapContainer from "./MapContainer";
import List from "./List";

class Landing extends Component {
  state = { loading: true, places: [] };

  handleNearPlaces = places => {
    this.setState({ places });
  };

  renderPlaces() {
    if (!this.state.loading) {
      const places = Array.from(this.state.places);
      console.log(places);
      return places.map(place => (
        <div key={place.id}>
          <h3>{place.name}</h3>
          <span>평균가격: {place.avgPrice}</span>
        </div>
      ));
    }
  }

  render() {
    return (
      <Container>
        <MapContainer />
        <ListContainer>
          <div>{this.state.loading ? null : this.renderPlaces()}</div>
        </ListContainer>
      </Container>
    );
  }
}

const Container = styled.div`
  display: flex;
`;

const ListContainer = styled.div``;

export default Landing;
