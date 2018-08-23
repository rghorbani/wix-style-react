import React from 'react';


import {Container, Col, Row} from '../../src/Grid';
import AddNewItem from '../../src/AddNewItem/AddNewItem';


const BreakpointsExample = () => (
  <Container>
    <div style={{padding: '30px', background: '#F0F4F7'}}>
      <Row stretchViewsVertically>
        <Col span={3}>
          <div style={{height: '240px'}}>
            <AddNewItem dataHook="additem-large" size="large">
            Add New Item
            </AddNewItem>
          </div>
        </Col>
        <Col span={3}>
          <div style={{height: '200px'}}>
            <AddNewItem dataHook="additem-medium" size="medium">
              Add New Item
            </AddNewItem>
          </div>
        </Col>
        <Col span={3}>
          <div style={{height: '130px'}}>
            <AddNewItem dataHook="additem-small" size="small">
            Add New Item
            </AddNewItem>
          </div>
        </Col>
        <Col span={3}>
          <div style={{height: '55px'}}>
            <AddNewItem dataHook="additem-tiny" size="tiny">
            Add New Item
            </AddNewItem>
          </div>
        </Col>
      </Row>
    </div>
  </Container>
);




export default BreakpointsExample;
