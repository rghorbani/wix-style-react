import React from 'react';
import CodeExample from 'wix-storybook-utils/CodeExample';

import AddNewItem from '../../src/AddNewItem/AddNewItem';
import Text from '../../src/Text';
import VerticalExample from './VerticalExample';
import WithoutActionExample from './WithoutActionExample';
import BreakpointsExample from './BreakpointsExample';
import WithinExample from './WithinExample';
import AddImageExample from './AddImageExample';
import {Container, Col, Row} from '../../src/Grid';

import {storySettings} from './storySettings';


const Cards = (
  <Container>
    <Row >
      <Col span={5}>
        <CodeExample title="Add item as a vertical card" code="">
          <VerticalExample/>
        </CodeExample>
      </Col>
      <Col span={7} >
        <CodeExample title="Add item without action text" code="">
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

const Within = (
  <Container>
    <Row >
      <Col span={6}>
        <CodeExample title="Add item within a card" code="">
          <WithinExample theme="dashes" title="Sections in Menu"/>
        </CodeExample>
      </Col>
      <Col span={6}>
        <CodeExample title="Add image placeholder" code="">
          <AddImageExample/>
        </CodeExample>
      </Col>
    </Row>
  </Container>
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

  examples: [Cards, Within, Breakpoints]

};
