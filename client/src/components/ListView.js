import React, { Component } from "react";
import { connect } from "react-redux";
import { List, Button } from "antd";
import styled from "styled-components";
import { addPlace } from "../actions";
import { SEARCH, ADD_DETAIL, PLACE_LIST } from "../actions/types";

class ListView extends Component {
  handleCreatePlace = item => {
    // const { name, lat, lng, address } = item;
    // axios
    //   .post("/api/places", {
    //     name,
    //     geometry: {
    //       type: "Point",
    //       coordinates: [lng, lat]
    //     },
    //     address
    //   })
    //   .then(res => console.log(res));
    return this.props.dispatch(addPlace(item, ADD_DETAIL));
  };

  renderButton(data) {
    return (
      <Button type="dashed" onClick={() => this.handleCreatePlace(data)}>
        등록하기
      </Button>
    );
  }

  render() {
    return (
      <StyledList
        itemLayout="horizontal"
        pagination={{
          onChange: page => {},
          pageSize: 5
        }}
        dataSource={this.props.data}
        renderItem={item => (
          <List.Item actions={[this.renderButton(item)]}>
            <List.Item.Meta
              title={<a href="https://ant.design">{item.name}</a>}
              description={item.address}
            />
            <div>{item.category}</div>
          </List.Item>
        )}
      />
    );
  }
}

const StyledList = styled(List)`
  padding: 3vw !important;
  background: #fff;
  border: 1px solid #e7e7e7;
`;

const mapStateToProps = state => state;

export default connect(mapStateToProps)(ListView);
