/*global daum*/

import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import axios from "axios";
import styled from "styled-components";
import { Card, Button, Select, Input, Icon, Breadcrumb } from "antd";
import UploadImage from "./UploadImage";
import { Column, Row } from "./common";
import { addPlace } from "../actions";
import { ADD_SUCCESS } from "../actions/types";

const InputGroup = Input.Group;
const Option = Select.Option;

class AddDetail extends Component {
  state = {
    menu: [],
    selected: []
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
    const { menu, selected } = this.state;
    const formData = new FormData();

    if (menu.length) {
      formData.append("menu", JSON.stringify(menu));

      let priceRange = menu.map(item => parseInt(item.price));
      priceRange = [Math.min(...priceRange), Math.max(...priceRange)];
      formData.append("priceRange", JSON.stringify(priceRange));
    }

    if (images) images.map(file => formData.append("image", file));
    if (selected.length) formData.append("tags", JSON.stringify(selected));
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
    if (e.target) this.setState({ [e.target.name]: e.target.value });
    // Adding data from Select to state
    else this.setState({ selected: e });
    // this.setState({
    //   [e.target.name]: e.target.value
    // });
  };

  handleAddMenu = () => {
    this.setState({
      menu: [
        ...this.state.menu,
        { name: this.state.item, price: this.state.price }
      ],
      item: "",
      price: ""
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
            <CardItem
              title={
                <Title>
                  <h3>{name}</h3>
                  <span>{category}</span>
                </Title>
              }
            >
              <ImageMap id="staticMap" />
              <p>{address}</p>
            </CardItem>
          </Box>
          <Box>
            <CardItem>
              <h3>메뉴</h3>
              {this.state.menu.map(item => (
                <MenuList key={item.name}>
                  <span>
                    <b>{item.name} </b>
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
                  onPressEnter={() => {
                    document.getElementById("price").focus();
                  }}
                />
                <MenuInput
                  id="price"
                  placeholder="가격"
                  onChange={this.handleChange}
                  name="price"
                  value={this.state.price || ""}
                  onPressEnter={this.handleAddMenu}
                />
                <Button onClick={this.handleAddMenu}>
                  <Icon type="check-circle" />
                </Button>
              </InputGroup>
              <br />
              <h3>특징 추가</h3>
              <Select
                mode="multiple"
                defaultValue={[]}
                name="selected"
                onChange={this.handleChange}
                style={{ width: "100%" }}
              >
                {["혼밥 가능", "포장 가능", "배달 가능"].map(item => (
                  <Option key={item}>{item}</Option>
                ))}
              </Select>
              <br />
              <br />
              <h3>사진</h3>
              <p>메뉴판 사진과 음식 사진 위주로 올려주세요</p>
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

const Title = styled(Row)`
  margin: 0;
  align-items: center;
  justify-content: space-between;
  & h3 {
    margin: 0;
  }
`;

const Box = styled(Column)`
  display: flex;
  margin: 2vh 0;
  flex: 1;
  align-items: center;
  &:first-of-type {
    border-right: 1px solid #e7e7e7;
  }
`;

const ImageMap = styled.div`
  margin: 0 auto;
  width: 40vw;
  height: 300px;
  margin-bottom: 2vh;
`;

const CardItem = styled(Card)`
  width: 90%;
  // & #first {
  //   background: blue;
  //   display: flex;
  //   flex-direction: column;
  //   align-items: center;
  //   & div {
  //     width: 100%;
  //   }
  // }
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
