import React from 'react';
import WixComponent from '../../BaseComponents/WixComponent';
import DragLayer from './DragLayer';
import PropTypes from 'prop-types';
import {DragSource as _DragSource, DropTarget as _DropTarget} from 'react-dnd';
import {dragCoordinates} from './DragUtils';
import {getEmptyImage} from 'react-dnd-html5-backend';

const ItemTypes = {
  DRAGGABLE: 'Draggable'
};

const source = {
  beginDrag: ({id, index}) => ({id, index}),
  endDrag: ({id, onMove, index}) => onMove({id, from: index}),
  isDragging: ({id}, monitor) => id === monitor.getItem().id
};

@_DragSource(ItemTypes.DRAGGABLE, source, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview(),
  isDragging: monitor.isDragging()
}))
export class DraggableSource extends React.Component {
  componentDidMount() {
    const {connectDragPreview} = this.props;

    connectDragPreview && connectDragPreview(getEmptyImage());
  }

  connectHandle(handle) {
    const {connectDragSource} = this.props;

    return connectDragSource(handle);
  }

  render() {
    const {isDragging, connectDragSource, withHandle, render, id, ...props} = this.props;

    return connectDragSource ? (
      <div>
        {withHandle ?
          render({
            isPlaceholder: isDragging,
            id,
            connectHandle: handle => this.connectHandle(handle),
            ...props
          }) :
          connectDragSource(
              render({isPlaceholder: isDragging, connectHandle: _ => _, id, ...props})
            )}
        <DragLayer
          renderPreview={() => render({isPreview: true, connectHandle: _ => _, id, ...props})}
          id={id}
          draggedType={ItemTypes.DRAGGABLE}
          />
      </div>
    ) : null;
  }
}

DraggableSource.propTypes = {
  isDragging: PropTypes.bool,
  connectDragSource: PropTypes.func,
  connectDragPreview: PropTypes.func,
  render: PropTypes.func,
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  withHandle: PropTypes.bool
};

const target = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    if (!component || hoverIndex === dragIndex) {
      return;
    }

    const {hoverClientY, hoverMiddleY} = dragCoordinates({monitor, component});

    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }

    props.onHover(dragIndex, hoverIndex);
    monitor.getItem().index = hoverIndex;
  }
};

@_DropTarget(ItemTypes.DRAGGABLE, target, connect => ({
  connectDropTarget: connect.dropTarget()
}))
export class Draggable extends WixComponent {
  render() {
    const {connectDropTarget, ...props} = this.props;
    return connectDropTarget ?
      connectDropTarget(
        <div>
          <DraggableSource {...props}/>
        </div>
        ) :
      null;
  }
}

Draggable.propTypes = {
  onMove: PropTypes.func,
  onHover: PropTypes.func,
  render: PropTypes.func.isRequired,
  withHandle: PropTypes.bool
};

export default Draggable;
