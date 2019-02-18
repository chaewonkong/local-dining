import React from "react";
import { Input } from "antd";

const Search = Input.Search;
const Header = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <h1>우리동네 착한밥상</h1>
      <div>
        <Search
          placeholder="input search text"
          enterButton
          size="large"
          onSearch={value => console.log(value)}
        />
      </div>
    </div>
  );
};

export default Header;
