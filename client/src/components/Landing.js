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
      return (
        <CardItem hoverable title={place.name} key={place._id}>
          <p>{place.address}</p>
          <p>평균 {place.avgPrice}원</p>
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
