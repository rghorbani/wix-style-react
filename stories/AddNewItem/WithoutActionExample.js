import React from 'react';
import PropTypes from 'prop-types';


import {Col, Row} from '../../src/Grid';
import AddNewItem from '../../src/AddNewItem/AddNewItem';
import PlaceHolder from '../assets/ImagePlaceholder';
import Card from 'wix-style-react/Card';

const MockCard = () => (
  <Card>
    <Card.Content>
      <Row>
        <CenterElements>
          <PlaceHolder/>
        </CenterElements>
      </Row>
      <Row>
        <CenterElements>
          <h4>Clark Broke</h4>
          <p>jen@yoga.train</p>
        </CenterElements>
      </Row>
    </Card.Content>
  </Card>
);

const CenterElements = ({children}) => (
  <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
    {children}
  </div>
);

const WithoutActionExample = () => (
  <div style={{padding: '30px', background: '#F0F4F7'}}>
    <Row stretchViewsVertically>
      <Col span={6}>
        <MockCard/>
      </Col>
      <Col span={6}>
        <AddNewItem dataHook="add-without-action" size="medium"/>
      </Col>
    </Row>
  </div>
);


CenterElements.propTypes = {
  children: PropTypes.node
};


export default WithoutActionExample;
