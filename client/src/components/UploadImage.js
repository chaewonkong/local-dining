import React, { Component } from "react";
import { connect } from "react-redux";
import { Upload, Icon, Modal, Button } from "antd";
import axios from "axios";
import { addPlace } from "../actions";
import { SEARCH, ADD_DETAIL, PLACE_LIST, ADD_SUCCESS } from "../actions/types";

class UploadImage extends Component {
  state = {
    previewVisible: false,
    previewImage: "",
    fileList: [],
    images: [],
    urlList: []
  };

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = file => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true
    });
  };

  handleChange = ({ fileList }) => {
    this.setState({ fileList });
  };

  handleUpload = files => {
    const { name, address, category, lat, lng } = this.props;
    const formData = new FormData();
    files.map(file => formData.append("image", file));
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
        if (res.status === 200)
          this.props.dispatch(addPlace(this.props, ADD_SUCCESS));
        else console.log("Fail");
      });
  };
  beforeUpload = file => {
    const { urlList, images } = this.state;
    const url = URL.createObjectURL(file);
    this.setState({
      images: [...images, file],
      urlList: [...urlList, { uid: file.uid, url: url }]
    });
  };

  render() {
    const { previewVisible, previewImage, urlList, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
          listType="picture-card"
          beforeUpload={this.beforeUpload}
          customRequest={() => false}
          fileList={urlList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 3 ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: "100%" }} src={previewImage} />
        </Modal>
        <Button
          type="primary"
          onClick={() => this.handleUpload(this.state.images)}
        >
          사진 올리기
        </Button>
      </div>
    );
  }
}

const mapStateToProps = state => state.newPlace.place;

export default connect(mapStateToProps)(UploadImage);
