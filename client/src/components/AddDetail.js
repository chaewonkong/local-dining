import React from "react";
import { connect } from "react-redux";

const AddDetail = props => {
  const { name, address, category, lat, lng } = props.newPlace.place;
  return (
    <div>
      <p>AddDetail</p>
      <p>{name}</p>
      <p>{address}</p>
      <p>{category}</p>
      <p>{lat}</p>
      <p>{lng}</p>
    </div>
  );
};

const mapStateToProps = state => state;

export default connect(mapStateToProps)(AddDetail);
