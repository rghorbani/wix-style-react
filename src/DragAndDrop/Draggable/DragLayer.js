import * as React from 'react';
import PropTypes from 'prop-types';
import {DragLayer as _DragLayer} from 'react-dnd';

const layerStyles = {
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 100,
  left: 0,
  top: 0
};

const dragLayerStyle = ({initialOffset, currentOffset}) => {
  if (!initialOffset || !currentOffset) {
    return {
      display: 'none'
    };
  }

  const transform = `translate(${currentOffset.x}px, ${currentOffset.y}px)`;
  return {
    ...layerStyles,
    transform,
    WebkitTransform: transform
  };
};

const CustomDragLayer = ({
  item,
  itemType,
  draggedType,
  isDragging,
  renderPreview,
  id,
  initialOffset,
  currentOffset
}) => {
  const shouldRenderLayer = isDragging && id === item.id && itemType === draggedType;
  const styles = dragLayerStyle({initialOffset, currentOffset});

  return shouldRenderLayer ? <div style={styles}>{renderPreview()}</div> : null;
};

CustomDragLayer.propTypes = {
  item: PropTypes.object,
  itemType: PropTypes.string,
  draggedType: PropTypes.string,
  isDragging: PropTypes.bool,
  renderPreview: PropTypes.func,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  initialOffset: PropTypes.number,
  currentOffset: PropTypes.number
};

export default _DragLayer(monitor => ({
  item: monitor.getItem(),
  itemType: monitor.getItemType(),
  initialOffset: monitor.getInitialSourceClientOffset(),
  currentOffset: monitor.getSourceClientOffset(),
  isDragging: monitor.isDragging()
}))(CustomDragLayer);
