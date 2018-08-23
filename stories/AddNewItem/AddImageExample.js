import React from 'react';

import AddNewItem from '../../src/AddNewItem/AddNewItem';
import {Col, Row} from '../../src/Grid';
import Card from '../../src/Card/Card';


const AddImageExample = () => (
  <div style={{padding: '30px', background: '#F0F4F7'}}>
    <Card>
      <Card.Content>
        <Row stretchViewsVertically>
          <Col stretchViewsVertically>
            <AddNewItem size="small" theme="image"/>
          </Col>
        </Row>
      </Card.Content>
    </Card>
  </div>
);




export default AddImageExample;
