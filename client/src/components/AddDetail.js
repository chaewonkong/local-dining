/*global daum*/

import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import axios from "axios";
import styled from "styled-components";
import { Card, Button, Slider, Input, Icon } from "antd";
import UploadImage from "./UploadImage";
import { Column, Row } from "./common";
import { addPlace } from "../actions";
import { ADD_SUCCESS } from "../actions/types";

const InputGroup = Input.Group;

class AddDetail extends Component {
  state = {
    menu: [],
    priceRange: []
  };
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
    const { menu, priceRange } = this.state;
    const formData = new FormData();
    if (menu.length) formData.append("menu", JSON.stringify(menu));
    if (priceRange.length)
      formData.append("priceRange", JSON.stringify(priceRange));
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

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  handleAddMenu = () => {
    this.setState({
      menu: [
        ...this.state.menu,
        { menu: this.state.item, price: this.state.price }
      ],
      item: "",
      price: ""
    });
  };

  render() {
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
              <ImageMap id="staticMap" />
              <p>{category}</p>
              <p>{address}</p>
            </CardItem>
          </Box>
          <Box>
            <CardItem>
              <h3>메뉴</h3>
              {this.state.menu.map(item => (
                <MenuList key={item.menu}>
                  <span>
                    <b>{item.menu} </b>
                  </span>
                  <span>{item.price} 원</span>
                </MenuList>
              ))}
              <InputGroup compact>
                <MenuInput
                  placeholder="메뉴"
                  onChange={this.handleChange}
                  name="item"
                  value={this.state.item || ""}
                />
                <MenuInput
                  placeholder="가격"
                  onChange={this.handleChange}
                  name="price"
                  value={this.state.price || ""}
                />
                <Button onClick={this.handleAddMenu}>
                  <Icon type="check-circle" />
                </Button>
              </InputGroup>
              <br />
              <h3>가격범위</h3>
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
              <br />

              <UploadImage />
            </CardItem>
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
  width: 30vw;
  height: 300px;
  margin-bottom: 2vh;
`;

const CardItem = styled(Card)`
  width: 90%;
  // display: flex;
  // justify-content: center;
`;

const StyledButton = styled(Button)`
  margin: 0 0.3vw;
`;

const MenuInput = styled(Input)`
  width: 45% !important;
`;

const MenuList = styled.div`
  margin: 2vh 0;
`;

const mapStateToProps = state => state;

export default connect(mapStateToProps)(AddDetail);
