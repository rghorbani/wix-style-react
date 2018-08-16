import React from 'react';
import CodeExample from 'wix-storybook-utils/CodeExample';

import AddNewItem from '../../src/AddNewItem/AddNewItem';
import Text from '../../src/Text';
import VerticalExample from './VerticalExample';
import WithoutActionExample from './WithoutActionExample';
import BreakpointsExample from './BreakpointsExample';
import {Container, Col, Row} from '../../src/Grid';

import {storySettings} from './storySettings';


const Cards = (
  <Container>
    <Row>
      <Col span={5}>
        <CodeExample title="Add as a vertical card" code="">
          <VerticalExample/>
        </CodeExample>
      </Col>
      <Col span={7} >
        <CodeExample title="Add without action text" code="">
          <WithoutActionExample/>
        </CodeExample>
      </Col>
    </Row>
  </Container>
);

const Breakpoints = (
  <CodeExample title="Breakpoints" code="">
    <BreakpointsExample/>
  </CodeExample>
);

const childrenExamples = [
  {label: 'String',
    value: 'Add New Item'
  },
  {label: 'Text Component',
    value: <Text>Add New Item</Text>
  }
];

export default {
  category: storySettings.kind,
  storyName: storySettings.storyName,
  component: AddNewItem,
  componentPath: '../../src/AddNewItem',

  componentProps: {
    theme: 'dashes',
    dataHook: storySettings.dataHook,
    children: childrenExamples[0].value,
    alignItems: 'center'
  },

  exampleProps: {
    children: childrenExamples
  },

  examples: [
    Cards, Breakpoints]

};
