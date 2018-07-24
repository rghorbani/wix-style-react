import React from 'react';
import {Table, ToolbarContextPropTypes} from 'wix-style-react/Table';
import {
  TableToolbar,
  ItemGroup,
  Item,
  Title,
  SelectedCount
} from 'wix-style-react/Table/Toolbar';

import Card from 'wix-style-react/Card';
import {Star, Download, Duplicate, Print} from 'wix-style-react/new-icons';

const baseData = [
  {name: 'Apple Towels', SKU: '111222', price: '$2.00', inventory: 'In stock'},
  {name: 'Cyan Towels', SKU: '222333', price: '$2.00', inventory: 'In stock'},
  {name: 'Marble Slippers', SKU: '333444', price: '$14.00', inventory: 'In stock'},
  {name: 'Red Slippers', SKU: '444555', price: '$14.00', inventory: 'Out of stock'}
];

export class TableActionColumnPrimarySecondaryExample extends React.Component {

  render() {
    return (
      <Card>
        <Table
          dataHook="story-table-action-column-primary-secondary-example"
          data={baseData}
          itemsPerPage={20}
          columns={[
              {title: 'Name', render: row => <span>{row.name}</span>, width: '30%', minWidth: '150px'},
              {title: 'SKU', render: row => <span>{row.SKU}</span>, width: '20%', minWidth: '100px'},
              {title: 'Price', render: row => <span>{row.price}</span>, width: '20%', minWidth: '100px'},
              {title: 'Inventory', render: row => <span>{row.inventory}</span>, width: '20%', minWidth: '100px'}
          ]}
          showSelection
          primaryRowAction={{
            name: 'Edit',
            theme: 'fullblue',
            onActionTrigger: rowData => window.alert(`Editing ${rowData.name}`)
          }}
          secondaryRowActions={[
            {name: 'Star', icon: <Star/>, onActionTrigger: rowData => window.alert(`Starring ${rowData.name}`)},
            {name: 'Download', icon: <Download/>, onActionTrigger: rowData => window.alert(`Downloading ${rowData.name}`)},
            {name: 'Duplicate', icon: <Duplicate/>, onActionTrigger: rowData => window.alert(`Duplicating ${(rowData.name)}`)},
            {name: 'Print', icon: <Print/>, onActionTrigger: rowData => window.alert(`Printing ${rowData.name}`)}
          ]}
          visibleSecondaryActions={2}
          alwaysShowSecondaryActions={false}
          >
          <Table.ToolbarContainer>
            { selectionContext =>
               selectionContext.selectedCount === 0 ?
                 <MainToolbar/> :
                 <BulkActionsToolbar {...selectionContext}/>
            }
          </Table.ToolbarContainer>
          <Table.Content/>
        </Table>
      </Card>
    );
  }
}

const MainToolbar = () => (
  <TableToolbar>
    <ItemGroup position="start">
      <Item>
        <Title>My Table</Title>
      </Item>
    </ItemGroup>
  </TableToolbar>
);

const BulkActionsToolbar = props => (
  <TableToolbar>
    <ItemGroup position="start">
      <Item>
        <SelectedCount>{`${props.selectedCount} Selected`}</SelectedCount>
      </Item>
    </ItemGroup>
  </TableToolbar>
);

BulkActionsToolbar.propTypes = ToolbarContextPropTypes;