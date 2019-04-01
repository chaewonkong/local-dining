import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import styled from "styled-components";
import Map from "./Map";
import { Button, Card, Icon } from "antd";
import { Column, Row } from "./common";

class Landing extends Component {
  state = { places: [] };

  handleNearPlaces = places => {
    this.setState({ places });
  };

  renderPlaces() {
    const places = this.props.places;
    return places.map(place => {
      const [min, max] = place.priceRange;
      return (
        <CardItem hoverable title={place.name} key={place._id}>
          <img
            src={place.images[0]}
            width="100%"
            style={{ maxHeight: "300px" }}
          />
          <p>{place.address}</p>
          {place.menu.map(item => (
            <p>
              <b>{item.name}</b> {item.price}{" "}
            </p>
          ))}
          <p>
            {min} ~ {max} 원
          </p>
        </CardItem>
      );
    });
  }

  render() {
    return (
      <Container>
        <Map />
        <Column>
          <Row>
            <Link to="/places/add">
              <Button type="primary">착한밥집 추가하기</Button>
            </Link>
            <Button type="secondary">필터</Button>
          </Row>
          <ListContainer>
            <div>{this.renderPlaces()}</div>
          </ListContainer>
        </Column>
      </Container>
    );
  }
}

const Container = styled.div`
  display: flex;
`;

const ListContainer = styled.div`
  display: flex;
  width: 30vw;
  flex-direction: column;
  align-items: center;
`;

const CardItem = styled(Card)`
  width: 30vw;
`;

const mapStateToProps = state => state;

export default connect(mapStateToProps)(Landing);
