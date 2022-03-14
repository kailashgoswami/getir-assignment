import React from 'react';
import { Row, Col, Button } from 'antd';

const Header = (props) => (
  <div className="App-header">
    <span className="top-title-container">
      Tasks
      </span>
    <span className="float-right">
      <Button type="primary" onClick={props.onClickCreate}>
        Create
        </Button>
    </span>
  </div>
);
export default Header;