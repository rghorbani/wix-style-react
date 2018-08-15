import React from 'react';


import AddNewItem from '../../src/AddNewItem/AddNewItem';
import Text from '../../src/Text';
import {storySettings} from './storySettings';


const childrenExamples = [
  {label: 'String',
    value: 'Add New Item'
  },
  {label: 'Text Component',
    value: <Text appearance="best">Add New Item</Text>
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
  }


};
