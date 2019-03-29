import React, { Fragment } from "react";
import { connect } from "react-redux";
import axios from "axios";
import styled from "styled-components";
import { Card, Button } from "antd";
import UploadImage from "./UploadImage";
import { Column, Row } from "./common";
import { addPlace } from "../actions";
import { ADD_SUCCESS } from "../actions/types";

const handleUpload = props => {
  const { address, category, images, name, lat, lng } = props.newPlace.place;
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
        props.dispatch(addPlace(null, ADD_SUCCESS));
      } else console.log("Fail");
    });
};

const AddDetail = props => {
  const { name, address, category, lat, lng } = props.newPlace.place;
  return (
    <Fragment>
      <Container>
        <Box>
          <CardItem title={name}>
            <p>{address}</p>
            <p>{category}</p>
            <p>{lat}</p>
            <p>{lng}</p>
          </CardItem>
        </Box>
        <Box>
          <UploadImage />
        </Box>
      </Container>
      <Row>
        <StyledButton onClick={() => handleUpload(props)} type="primary">
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
};

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
  justify-content: center;
  align-items: center;
  :first-of-type {
    border-right: 1px solid #e7e7e7;
  }
`;

const CardItem = styled(Card)`
  width: 90%;
`;

const StyledButton = styled(Button)`
  margin: 0 0.3vw;
`;

const mapStateToProps = state => state;

export default connect(mapStateToProps)(AddDetail);
