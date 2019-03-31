import React, { Component } from "react";
import { connect } from "react-redux";
import { Upload, Icon, Modal } from "antd";
import { addPlace } from "../actions";
import { ADD_DETAIL } from "../actions/types";

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

  beforeUpload = file => {
    const { urlList, images } = this.state;
    const url = URL.createObjectURL(file);
    this.setState({
      images: [...images, file],
      urlList: [...urlList, { uid: file.uid, url: url }]
    });
    this.props.dispatch(
      addPlace({ ...this.props, images: [...images, file] }, ADD_DETAIL)
    );
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
          style={{ background: "#ffffff" }}
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
      </div>
    );
  }
}

const mapStateToProps = state => state.newPlace.place;

export default connect(mapStateToProps)(UploadImage);
