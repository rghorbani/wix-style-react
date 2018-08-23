import React from 'react';
import PropTypes from 'prop-types';

import AddNewItem from '../../src/AddNewItem/AddNewItem';
import Card from 'wix-style-react/Card';
import More from 'wix-style-react/new-icons/More';
import ImagePlaceholder from '../assets/SectionImagePlaceholder';

const CardRowStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderRadius: '8px'
};

const CardRow = ({children}) => (
  <div style={CardRowStyle}>
    <div style={CardRowStyle}>
      <ImagePlaceholder/>
      <h5>{children}</h5>
    </div>
    <More/>
  </div>
);

CardRow.propTypes = {
  children: PropTypes.node
};

const Row = ({children}) => (
  <div style={{padding: '10px'}}>
    {children}
  </div>
);

Row.propTypes = {
  children: PropTypes.node
};

const WithinExample = ({theme, title}) => (
  <div style={{padding: '30px', background: '#F0F4F7'}}>
    <Card>
      <Card.Header title={title}/>
      <Card.Content>
        <Row>
          <AddNewItem dataHook="add-as-card" theme={theme} size="tiny">
          Add New Item
          </AddNewItem>
        </Row>
      </Card.Content>
    </Card>
  </div>

);

WithinExample.propTypes = {
  theme: PropTypes.string,
  alignItems: PropTypes.string,
  title: PropTypes.string
};




export default WithinExample;
