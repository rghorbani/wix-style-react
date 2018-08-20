import SortableList from '../../src/SortableList';

export default {
  category: 'Components',
  storyName: 'SortableList',
  component: SortableList,
  componentPath: '../../src/SortableList/SortableList.js',
  componentProps: {
    dataHook: 'sortable-list',
    onMove: () => 'onMove',
    items: [
      {
        id: 1,
        text: 'Item 1'
      },
      {
        id: 2,
        text: `Item 2`
      },
      {
        id: 3,
        text: 'Item 3'
      },
      {
        id: 4,
        text: 'Item 4'
      }
    ]
  }
};
