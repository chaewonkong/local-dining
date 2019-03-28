import React from "react";
import { List, Button } from "antd";
import styled from "styled-components";

const listData = [];
for (let i = 0; i < 23; i++) {
  listData.push({
    href: "http://ant.design",
    title: `ant design part ${i}`,
    avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
    description:
      "Ant Design, a design language for background applications, is refined by Ant UED Team.",
    content:
      "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently."
  });
}

const handleCreatePlace = item => {
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
  console.log(item);
  // return (window.location.href = "/places/add/detail");
};

const SubmitButton = props => (
  <Button type="dashed" onClick={() => handleCreatePlace(props.data)}>
    등록하기
  </Button>
);

const ListView = props => (
  <StyledList
    itemLayout="horizontal"
    pagination={{
      onChange: page => {},
      pageSize: 5
    }}
    dataSource={props.data}
    renderItem={item => (
      <List.Item actions={[<SubmitButton data={item} />]}>
        <List.Item.Meta
          title={<a href="https://ant.design">{item.name}</a>}
          description={item.address}
        />
        <div>{item.category}</div>
      </List.Item>
    )}
  />
);

const StyledList = styled(List)`
  padding: 3vw !important;
  background: #fff;
  border: 1px solid #e7e7e7;
`;

export default ListView;
