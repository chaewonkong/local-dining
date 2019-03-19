import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import axios from "axios";
import RenderedMap from "./RenderedMap";
import List from "./List";

class Landing extends Component {
  state = { places: [] };

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevProps !== this.props)
  //     return this.setState({ places: this.props.places });
  // }

  handleNearPlaces = places => {
    this.setState({ places });
  };

  renderPlaces() {
    const places = this.props.places;
    return places.map(place => {
      return (
        <div key={place.id || 0}>
          <h1>{place.name}</h1>
          <p>{place.address}</p>
          <p>평균 {place.avgPrice}원</p>
        </div>
      );
    });
  }

  render() {
    console.log(this.props);
    return (
      <Container>
        <RenderedMap />
        <ListContainer>
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
