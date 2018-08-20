import React from 'react';
import WixComponent from '../BaseComponents/WixComponent';
import {Draggable} from '../DragAndDrop/Draggable';

export default class Sortable extends WixComponent {
  constructor(props) {
    super(props);
    this.onHover = this.onHover.bind(this);
    this.onMove = this.onMove.bind(this);
    this.state = {
      items: props.items || []
    };
  }

  componentWillReceiveProps({items}) {
    items && this.setState({items});
  }

  render() {
    const {items} = this.state;
    const {render, withHandle} = this.props;

    return (
      <div>
        {items.map(({id, ...props}, i) => (
          <div key={i}>
            <Draggable
              key={id}
              id={id}
              index={i}
              onHover={this.onHover}
              onMove={this.onMove}
              render={render}
              withHandle={withHandle}
              {...props}
              />
          </div>
        ))}
      </div>
    );
  }

  onHover(dragIndex, hoverIndex) {
    this.setState(
      ({items: [..._items]}) =>
        _items.splice(hoverIndex, 0, ..._items.splice(dragIndex, 1)) && {
          items: _items
        }
    );
  }

  onMove({id, from}) {
    const to = this.state.items.findIndex(({id: _}) => _ === id);

    return this.props.onMove({id, from, to});
  }
}
