/*global daum*/

import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import axios from "axios";
import styled from "styled-components";
import { Card, Button, Slider } from "antd";
import UploadImage from "./UploadImage";
import { Column, Row } from "./common";
import { addPlace } from "../actions";
import { ADD_SUCCESS } from "../actions/types";

class AddDetail extends Component {
  state = {};
  componentDidMount() {
    const { lat, lng } = this.props.newPlace.place;

    const markerPosition = new daum.maps.LatLng(
      parseFloat(lat),
      parseFloat(lng)
    );
    const marker = new daum.maps.Marker({
      position: markerPosition
    });

    const staticMapContainer = document.getElementById("staticMap");
    const staticMapOption = {
      center: new daum.maps.LatLng(parseFloat(lat), parseFloat(lng)),
      level: 3,
      marker
    };
    const staticMap = new daum.maps.StaticMap(
      staticMapContainer,
      staticMapOption
    );
  }

  handleUpload = () => {
    const {
      address,
      category,
      images,
      name,
      lat,
      lng
    } = this.props.newPlace.place;
    const formData = new FormData();
    if (images) images.map(file => formData.append("image", file));
    formData.append("name", name);
    formData.append("address", address);
    formData.append("lat", lat);
    formData.append("lng", lng);
    formData.append("category", category);
    axios
      .post("/api/places", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then(res => {
        if (res.status === 200) {
          this.props.dispatch(addPlace(null, ADD_SUCCESS));
        } else console.log("Fail");
      });
  };

  render() {
    console.log(this.state);
    const { name, address, category } = this.props.newPlace.place;
    const marks = {
      2000: "2,000원",
      20000: "20,000원"
    };

    return (
      <Fragment>
        <Container>
          <Box>
            <CardItem title={name}>
              <p>{category}</p>
              <p>대표메뉴</p>
              <p>메뉴</p>
              <span>가격범위</span>
              <Slider
                range
                defaultValue={[6500, 10000]}
                min={2000}
                max={20000}
                step={100}
                marks={marks}
                tooltipVisible
                onChange={priceRange => this.setState({ priceRange })}
              />
              <UploadImage />
            </CardItem>
          </Box>
          <Box>
            <ImageMap id="staticMap" />
            <p>{address}</p>
          </Box>
        </Container>
        <Row>
          <StyledButton onClick={() => this.handleUpload()} type="primary">
            확인
          </StyledButton>
          <StyledButton
            onClick={() => (window.location.href = "/")}
            type="danger"
            ghost
          >
            취소
          </StyledButton>
        </Row>
      </Fragment>
    );
  }
}

const Container = styled.div`
  width: 100%;
  margin: 4vh 0;
  display: flex;
  flex-direction: row;
  @media (orientation: portrait) {
    flex-direction: column;
  }
`;

const Box = styled(Column)`
  display: flex;
  margin: 2vh 0;
  flex: 1;
  align-items: center;
  :first-of-type {
    border-right: 1px solid #e7e7e7;
  }
`;

const ImageMap = styled.div`
  width: 45vw;
  height: 300px;
  margin-bottom: 2vh;
`;

const CardItem = styled(Card)`
  width: 90%;
`;

const StyledButton = styled(Button)`
  margin: 0 0.3vw;
`;

const mapStateToProps = state => state;

export default connect(mapStateToProps)(AddDetail);
